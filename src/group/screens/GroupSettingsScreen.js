import React, { Component } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Query } from 'react-apollo'
import { ListItem } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import { getGroup } from '@group/GroupService'
import { ScreenBase, Text, Button, Badge, Section, Error, Loading } from '@global/components'
import { colors, layout } from '@global/styles'
import AddUsersModal from '@group/components/AddUsersModal'

// TODO: Top same as AlbumSettingsScreen
class GroupSettingsScreen extends Component {
  state = { modalVisible: false, authUsers: [], newAuthUsers: [] }

  // TODO: move to service
  async componentDidMount () {
    console.log('TODO: Group Settings Auth Users')
    // const { group } = this.props
    // const filter = { or: group.authUsers.map(id => ({ id: { eq: id } })) }
    // const { data: { listUsers: { items: authUsers } } } = await listUsers({ filter }, true)
    // this.setState({ authUsers: authUsers.map(user => ({ ...user, isOwner: user.id === group.owner })) })
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
      title={<Text subtitleOne>{phoneNumber}</Text>}
      badge={isOwner ? {
        value: <Badge>owner</Badge>,
        badgeStyle: { backgroundColor: colors.secondaryBackground }
      } : null}
      topDivider={index !== 0}
    />
  )

  render () {
    const { group } = this.props
    const { authUsers, newAuthUsers, modalVisible } = this.state
    return (
      <ScreenBase style={styles.container}>
        <View style={styles.imageContainer}>
          <MaterialIcons name='image' color={colors.primaryBackground} size={layout.s6} />
          <Text h4 color={colors.primaryBackground} style={styles.imageCaption}>{group.name}</Text>
        </View>
        <Section
          title='Members'
          listComponent={<FlatList keyExtractor={({ id }) => id} data={authUsers} renderItem={this.renderItem} />}
        />
        <Button containerStyle={styles.buttonContainer} onPress={this.showModal}>Add Members</Button>
        <AddUsersModal
          visible={modalVisible}
          hide={this.hideModal}
          toggleUser={this.toggleAuthUser}
          users={authUsers}
          newUsers={newAuthUsers}
        />
      </ScreenBase>
    )
  }
}

const ConnectedGroupSettingsScreen = props => {
  const query = getGroup
  const variables = { id: props.navigation.getParam('groupId') }
  const dataExtractor = ({ data: { getGroup }, loading, error }) => ({
    error,
    loading: loading || !getGroup,
    item: getGroup
  })
  return (
    <Query query={query} variables={variables} fetchPolicy='cache-and-network'>
      {data => {
        const { error, loading, item } = dataExtractor(data)
        if (error) return <Error />
        if (loading) return <Loading />
        return <GroupSettingsScreen group={item} {...props} />
      }}
    </Query>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start'
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: colors.textDefault,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  imageCaption: {
    position: 'absolute',
    bottom: layout.s3,
    left: layout.s3,
    marginBottom: 0
  },
  buttonContainer: {
    marginTop: layout.s3,
    marginHorizontal: layout.s3,
    width: 'auto'
  }
})

export default ConnectedGroupSettingsScreen
