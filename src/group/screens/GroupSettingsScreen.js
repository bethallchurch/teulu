import React, { Component } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import { MaterialIcons } from '@expo/vector-icons'
import { GET_GROUP, UPDATE_GROUP, createGroupLink } from '@group/GroupService'
import { LIST_CONTACTS } from '@contact/ContactService'
import { ScreenBase, Text, Section, Error, Loading } from '@global/components'
import ContactListItem from '@contact/components/ContactListItem'
import AddUsersModal from '@group/components/AddUsersModal'
import AddMembersButton from '@group/components/AddMembersButton'
import { colors, layout } from '@global/styles'

// TODO: Top same as AlbumSettingsScreen
class GroupSettingsScreen extends Component {
  state = { modalVisible: false, newMembers: [] }

  toggleNewMember = id => {
    const { newMembers } = this.state
    const updatedNewMembers = newMembers.includes(id)
      ? newMembers.filter(authUserId => authUserId !== id)
      : [ id, ...newMembers ]
    this.setState({ newMembers: updatedNewMembers })
  }

  updateMembers = async () => {
    const { currentMembers, updateGroupUsers } = this.props
    const { newMembers } = this.state

    const newUsers = newMembers.map(({ id }) => id)
    const allGroupUsers = [ ...currentMembers.map(({ id }) => id), ...newMembers ]

    try {
      await updateGroupUsers({ allGroupUsers, newUsers })
      this.hideModal()
    } catch (error) {
      console.log('Error updating group members:', error)
    }
  }

  showModal = () => this.setState({ modalVisible: true })
  hideModal = () => this.setState({ modalVisible: false })

  renderItem = ({ item, index }) => (
    <ContactListItem
      {...item}
      index={index}
      name={item.name4}
      owner={this.props.group.owner === item.id}
      itemContainerStyle={styles.itemContainer}
    />
  )

  render () {
    const { group, currentMembers } = this.props
    const { modalVisible, newMembers } = this.state
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
            <>
              <AddMembersButton onPress={this.showModal} />
              <FlatList
                style={styles.list}
                keyExtractor={({ id }) => id}
                data={currentMembers}
                renderItem={this.renderItem}
              />
            </>
          )}
        />
        <AddUsersModal
          visible={modalVisible}
          hide={this.hideModal}
          toggleUser={this.toggleNewMember}
          users={currentMembers}
          newUsers={newMembers}
          addUsers={this.updateMembers}
        />
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
  divider: {
    backgroundColor: colors.textLight
  },
  list: {
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
  itemContainer: {
    paddingHorizontal: layout.s3,
    backgroundColor: colors.secondaryBackground
  }
})

const groupDataExtractor = ({ data: { getGroup } = {}, loading, error }) => ({
  error,
  loading: loading || !getGroup,
  group: getGroup
})

const contactDataExtractor = ({ data: { listUsers } = {}, loading, error }) => ({
  error,
  loading: loading || !listUsers,
  contacts: listUsers ? listUsers.items : []
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
    const { authUsers = [] } = groupData.data.getGroup || {}
    const variables = { filter: { id: { in: authUsers } } }
    return (
      <Query query={LIST_CONTACTS} variables={variables}>
        {contactData => render(contactData)}
      </Query>
    )
  },
  updateGroup: ({ render }) => (
    <Mutation mutation={UPDATE_GROUP}>
      {mutation => render(mutation)}
    </Mutation>
  )
}

const mapProps = ({ user, groupData, contactData, updateGroup }) => {
  const { error: groupError, loading: groupLoading, group } = groupDataExtractor(groupData)
  const { error: contactsError, loading: contactsLoading, contacts } = contactDataExtractor(contactData)
  return {
    error: groupError || contactsError,
    loading: groupLoading && contactsLoading,
    group,
    contacts,
    updateGroupUsers: async ({ allGroupUsers, newUsers }) => {
      try {
        await updateGroup({ variables: { input: { id: group.id, authUsers: allGroupUsers } } })
        Promise.all(newUsers.map(id => {
          const input = { groupLinkUserId: id, groupLinkGroupId: group.id }
          return createGroupLink(input)
        }))
      } catch (error) {
        console.log('Error updating group members:', error)
      }
    }
  }
}

const Connect = adopt(mapper, mapProps)

const ConnectedGroupSettingsScreen = props => {
  return (
    <Connect groupId={props.navigation.getParam('groupId')}>
      {({ error, loading, group, contacts, updateGroupUsers }) => {
        if (error) return <Error />
        if (loading) return <Loading />
        return (
          <GroupSettingsScreen group={group} currentMembers={contacts} updateGroupUsers={updateGroupUsers} {...props} />
        )
      }}
    </Connect>
  )
}

export default ConnectedGroupSettingsScreen
