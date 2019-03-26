import React, { Component } from 'react'
import { FlatList, StyleSheet, ScrollView } from 'react-native'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import { GET_GROUP, UPDATE_GROUP, CREATE_GROUP_LINK } from '@group/GroupService'
import { LIST_CONTACTS } from '@contact/ContactService'
import { UserContext } from '@global/context'
import { ScreenBase, Error, Loading } from '@global/components'
import ContactListItem from '@contact/components/ContactListItem'
import AddMembersModal from '@group/components/AddMembersModal'
import AddMembersButton from '@group/components/AddMembersButton'
import { colors, layout } from '@global/styles'

class GroupMembersScreen extends Component {
  state = { modalVisible: false, newMembers: [] }

  showModal = () => this.setState({ modalVisible: true })
  hideModal = () => this.setState({ modalVisible: false })

  toggleNewMember = id => {
    const { newMembers } = this.state
    const updatedNewMembers = newMembers.includes(id)
      ? newMembers.filter(authUserId => authUserId !== id)
      : [ id, ...newMembers ]
    this.setState({ newMembers: updatedNewMembers })
  }

  updateMembers = async () => {
    const { currentMembers, updateGroupMembers } = this.props
    const { newMembers } = this.state

    const newUsers = newMembers.map(({ id }) => id)
    const allGroupUsers = [ ...currentMembers.map(({ id }) => id), ...newMembers ]

    try {
      await updateGroupMembers({ allGroupUsers, newUsers })
      this.hideModal()
    } catch (error) {
      console.log('Error updating group members:', error)
    }
  }

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
    const { currentMembers } = this.props
    const { modalVisible, newMembers } = this.state
    return (
      <ScreenBase>
        <ScrollView style={{ padding: layout.s3 }}>
          <AddMembersButton onPress={this.showModal} />
          <FlatList
            style={styles.list}
            keyExtractor={({ id }) => id}
            data={currentMembers}
            renderItem={this.renderItem}
          />
        </ScrollView>
        <AddMembersModal
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
  list: {
    width: '100%'
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

const membersDataExtractor = ({ data: { listUsers } = {}, loading, error }) => ({
  error,
  loading: loading || !listUsers,
  members: listUsers ? listUsers.items : []
})

const mapper = {
  user: <UserContext.Consumer />,
  groupData: ({ groupId, render }) => {
    return (
      <Query query={GET_GROUP} variables={{ id: groupId }}>
        {groupData => render(groupData)}
      </Query>
    )
  },
  memberData: ({ render, groupData: { data = {} } }) => {
    const { authUsers = [] } = data.getGroup || {}
    const variables = { filter: { id: { in: authUsers } } }
    return (
      <Query query={LIST_CONTACTS} variables={variables}>
        {memberData => render(memberData)}
      </Query>
    )
  },
  updateGroup: ({ render }) => (
    <Mutation mutation={UPDATE_GROUP}>
      {mutation => render(mutation)}
    </Mutation>
  ),
  createGroupLink: ({ render }) => (
    <Mutation mutation={CREATE_GROUP_LINK}>
      {mutation => render(mutation)}
    </Mutation>
  )
}

const mapProps = ({
  user,
  updateUser,
  updateGroup,
  groupData = {},
  createGroupLink,
  memberData = {}
}) => {
  const { error: groupError, loading: groupLoading, group } = groupDataExtractor(groupData)
  const { error: membersError, loading: membersLoading, members } = membersDataExtractor(memberData)
  return {
    group,
    members,
    error: groupError || membersError,
    loading: groupLoading && membersLoading,
    updateGroupMembers: async ({ allGroupUsers, newUsers }) => {
      try {
        await updateGroup({ variables: { input: { id: group.id, authUsers: allGroupUsers } } })
        Promise.all(newUsers.map(id => {
          return createGroupLink({ variables: { input: { groupLinkUserId: id, groupLinkGroupId: group.id } } })
        }))
      } catch (error) {
        console.log('Error updating group members:', error)
      }
    }
  }
}

const Connect = adopt(mapper, mapProps)

const ConnectedGroupMembersScreen = props => {
  const groupId = props.navigation.getParam('groupId')
  return (
    <Connect groupId={groupId}>
      {({ error, loading, group, members, updateGroupMembers }) => {
        if (error) return <Error />
        if (loading) return <Loading />
        return (
          <GroupMembersScreen
            {...props}
            group={group}
            currentMembers={members}
            updateGroupMembers={updateGroupMembers}
          />
        )
      }}
    </Connect>
  )
}

export default ConnectedGroupMembersScreen
