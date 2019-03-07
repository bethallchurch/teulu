import React from 'react'
import { Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import uuid from 'uuid/v4'
import { createGroup, createGroupLink, listGroups } from '@group/GroupService'
import SelectContactList from '@contact/components/SelectContactList'
import { UserContext } from '@global/context'
import { GROUP } from '@navigation/routes'
import { WithInputs, ScreenBase, TextInput, Button, Text } from '@global/components'
import { layout } from '@global/styles'

class CreateGroup extends WithInputs {
  state = { authUsers: [], groupName: '' }

  toggleAuthUser = id => {
    const { authUsers } = this.state
    const updatedAuthUsers = authUsers.includes(id)
      ? authUsers.filter(authUserId => authUserId !== id)
      : [ id, ...authUsers ]
    this.setState({ authUsers: updatedAuthUsers })
  }

  createGroup = () => {
    const { userId, createGroup } = this.props
    const { groupName: name, authUsers } = this.state
    const groupUsers = [ userId, ...authUsers ]
    const input = { id: uuid(), name, owner: userId, authUsers: groupUsers }
    createGroup({ input })
  }

  render () {
    const { groupName, authUsers } = this.state
    return (
      <ScreenBase avoidKeyboard contentContainer>
        <Text h5 style={{ width: '100%', marginBottom: layout.s2 }}>Name your group</Text>
        <TextInput
          placeholder='Group Name'
          value={groupName}
          returnKeyType='go'
          autoCorrect={false}
          onChangeText={value => this.onChangeText('groupName', value)}
        />
        <Text h5 style={{ width: '100%', marginVertical: layout.s2 }}>Add members</Text>
        <SelectContactList
          selectedContacts={authUsers}
          onPressContact={this.toggleAuthUser}
        />
        <Button onPress={this.createGroup}>Create Group</Button>
      </ScreenBase>
    )
  }
}

const mapper = {
  user: <UserContext.Consumer />,
  createGroup: ({ navigate, render }) => (
    <Mutation
      mutation={createGroup}
      onCompleted={async ({ createGroup }) => {
        const { id, authUsers } = createGroup
        await Promise.all(authUsers.map(username => {
          const input = { groupLinkUserId: username, groupLinkGroupId: id }
          return createGroupLink(input)
        }))
      }}
    >
      {mutation => render({
        mutation,
        navigateToGroup: ({ groupId, groupName }) => navigate(GROUP, ({ groupId, groupName }))
      })}
    </Mutation>
  )
}

const mapProps = ({ user, createGroup }) => ({
  user,
  createGroup: ({ input }) => {
    const { navigateToGroup } = createGroup
    const time = new Date().toISOString()
    const optimisticResponse = {
      createGroup: {
        __typename: 'Group',
        ...input,
        messages: {
          __typename: 'ModelMessageConnection',
          items: [],
          nextToken: null
        },
        albums: {
          __typename: 'ModelAlbumConnection',
          items: [],
          nextToken: null
        },
        userLinks: {
          __typename: 'ModelGroupLinkConnection',
          items: [],
          nextToken: null
        },
        createdAt: time,
        updatedAt: time
      }
    }
    const update = (cache, { data: { createGroup } }) => {
      const query = listGroups
      const groups = cache.readQuery({ query })
      groups.listGroups.items = [ createGroup, ...groups.listGroups.items ]
      cache.writeQuery({ query, data: groups })
      navigateToGroup({ groupId: createGroup.id, groupName: createGroup.name })
    }
    createGroup.mutation({ variables: { input }, optimisticResponse, update })
  }
})

const Connect = adopt(mapper, mapProps)

const ConnectedCreateGroup = props => (
  <Connect navigate={props.navigation.navigate}>
    {({ user, ...connectProps }) => (
      <CreateGroup userId={user.id} {...connectProps} {...props} />
    )}
  </Connect>
)

export default ConnectedCreateGroup
