import React, { Component } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Query } from 'react-apollo'
import { adopt } from 'react-adopt'
import { MaterialIcons } from '@expo/vector-icons'
import { GET_GROUP } from '@group/GroupService'
import { LIST_CONTACTS } from '@contact/ContactService'
import { ScreenBase, Text, Section, Error, Loading } from '@global/components'
import ContactListItem from '@contact/components/ContactListItem'
import { colors, layout } from '@global/styles'

// TODO: Top same as AlbumSettingsScreen
class GroupSettingsScreen extends Component {
  renderItem = ({ item, index }) => (
    <ContactListItem
      {...item}
      index={index}
      name={item.name3}
      owner={this.props.group.owner === item.id}
    />
  )

  render () {
    const { group, authContacts } = this.props
    return (
      <ScreenBase style={styles.container}>
        <View style={styles.imageContainer}>
          <MaterialIcons name='image' color={colors.primaryBackground} size={layout.s6} />
          <Text h4 color={colors.primaryBackground} style={styles.imageCaption}>{group.name}</Text>
        </View>
        <Section
          containerStyle={styles.sectionContainer}
          title='Members'
          listComponent={(
            <FlatList
              style={styles.list}
              keyExtractor={({ id }) => id}
              data={authContacts}
              renderItem={this.renderItem}
            />
          )}
        />
        {/* TODO
          <Button containerStyle={styles.buttonContainer} onPress={this.showModal}>Add Members</Button>
          <AddUsersModal
            visible={modalVisible}
            hide={this.hideModal}
            toggleUser={this.toggleAuthUser}
            users={authUsers}
            newUsers={newAuthUsers}
          />
        */}
      </ScreenBase>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start'
  },
  sectionContainer: {
    marginBottom: layout.s3
  },
  list: {
    backgroundColor: colors.secondaryBackground,
    width: '100%'
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
    marginHorizontal: layout.s3,
    width: 'auto'
  }
})

const groupDataExtractor = ({ data: { getGroup }, loading, error }) => ({
  error,
  loading: loading || !getGroup,
  group: getGroup
})

const contactDataExtractor = ({ data: { listUsers }, loading, error }) => ({
  error,
  loading: loading || !listUsers,
  contacts: listUsers
})

const mapper = {
  groupData: ({ groupId, render }) => {
    return (
      <Query query={GET_GROUP} variables={{ id: groupId }}>
        {groupData => render(groupData)}
      </Query>
    )
  },
  contactData: ({ render, groupData }) => {
    const { authUsers } = groupData.data.getGroup
    const variables = { filter: { id: { in: authUsers } } }
    return (
      <Query query={LIST_CONTACTS} variables={variables}>
        {contactData => render(contactData)}
      </Query>
    )
  }
}

const mapProps = ({ user, groupData, contactData }) => {
  const { error: groupError, loading: groupLoading, group } = groupDataExtractor(groupData)
  const { error: contactsError, loading: contactsLoading, contacts } = contactDataExtractor(contactData)
  return {
    error: groupError || contactsError,
    loading: groupLoading && contactsLoading,
    group,
    contacts
  }
}

const Connect = adopt(mapper, mapProps)

const ConnectedGroupSettingsScreen = props => {
  return (
    <Connect groupId={props.navigation.getParam('groupId')}>
      {({ error, loading, group, contacts }) => {
        if (error) return <Error />
        if (loading) return <Loading />
        return <GroupSettingsScreen group={group} authContacts={contacts ? contacts.items : []} {...props} />
      }}
    </Connect>
  )
}

export default ConnectedGroupSettingsScreen
