import React, { Component } from 'react'
import { graphqlOperation } from 'aws-amplify'
import { SafeAreaView, Text, View, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native'
import { Connect } from 'aws-amplify-react-native'
import { ListItem } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import * as queries from '@graphql/queries'
import { listUsers } from '@user/UserService'
import Section from '@global/components/Section'
import Loading from '@global/components/Loading'
import Error from '@global/components/Error'
import Button from '@global/components/Button'
import SelectContactList from '@contact/components/SelectContactList'
import { colors, subtitleStyle, copyStyle, fBold } from '@global/styles'

class GroupSettingsScreen extends Component {
  state = { modalVisible: false, authUsers: [], newAuthUsers: [] }

  async componentDidMount () {
    const { group } = this.props
    const filter = { or: group.authUsers.map(id => ({ id: { eq: id } })) }
    const { data: { listUsers: { items: authUsers } } } = await listUsers(filter)
    this.setState({ authUsers: authUsers.map(user => ({ ...user, isOwner: user.id === group.owner })) })
  }

  showModal = () => {
    this.setState({ modalVisible: true })
  }

  hideModal = () => {
    this.setState({ modalVisible: false })
  }

  toggleAuthUser = id => {
    const { newAuthUsers } = this.state
    const updatedAuthUsers = newAuthUsers.includes(id)
      ? newAuthUsers.filter(authUserId => authUserId !== id)
      : [ id, ...newAuthUsers ]
    this.setState({ newAuthUsers: updatedAuthUsers })
  }

  renderItem = ({ item: { id, phoneNumber, isOwner }, index }) => (
    <ListItem
      key={id}
      title={phoneNumber}
      titleStyle={copyStyle.regular}
      badge={isOwner ? { value: 'owner', textStyle: { color: colors.primary, ...fBold, fontSize: 12, lineHeight: 15 }, badgeStyle: { borderRadius: 4, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.primary, backgroundColor: colors.secondaryBackground }, badgeContainerStyle: { padding: 20 } } : null}
      topDivider={index !== 0}
    />
  )

  render () {
    const { group } = this.props
    const { authUsers, newAuthUsers, modalVisible } = this.state
    return (
      <SafeAreaView style={{ backgroundColor: colors.primaryBackground, flex: 1 }}>
        <View style={{ width: '100%', height: 200, backgroundColor: colors.textDefault, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <MaterialIcons name='image' color={colors.primaryBackground} size={48} />
          <Text style={{ ...subtitleStyle.style, position: 'absolute', bottom: 16, left: 16, color: colors.primaryBackground, marginBottom: 0 }}>{group.name}</Text>
        </View>
        <Section
          title='Members'
          listComponent={<FlatList keyExtractor={({ id }) => id} data={authUsers} renderItem={this.renderItem} />}
        />
        <Button containerStyle={{ marginHorizontal: 16, width: 'auto' }} onPress={this.showModal}>Add Members</Button>
        <Modal transparent visible={modalVisible} onRequestClose={this.hideModal}>
          <TouchableOpacity style={{ flex: 1 }} onPress={this.hideModal}>
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
              <View style={{ padding: 16, backgroundColor: colors.primaryBackground, margin: 16 }}>
                <Text style={subtitleStyle.style}>Add New Members</Text>
                <SelectContactList
                  exclude={authUsers.map(({ id }) => id)}
                  selectedContacts={newAuthUsers}
                  onPressContact={this.toggleAuthUser}
                />
                <Text style={copyStyle.regular}>Coming Soon!</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    )
  }
}

const ConnectedGroupSettingsScreen = props => (
  <Connect
    query={graphqlOperation(queries.getGroup, { id: props.navigation.getParam('groupId') })}
  >
    {({ data: { getGroup }, loading, error }) => {
      if (error) return <Error />
      if (loading || !getGroup) return <Loading />
      return <GroupSettingsScreen group={getGroup} {...props} />
    }}
  </Connect>
)

export default ConnectedGroupSettingsScreen
