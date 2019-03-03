import React from 'react'
import { createGroup, createGroupLink } from '@group/GroupService'
import SelectContactList from '@contact/components/SelectContactList'
import { UserContext } from '@global/context'
import { GROUP } from '@navigation/routes'
import { WithInputs, ScreenBase, TextInput, Button, Text } from '@global/components'
import { layout } from '@global/styles'

// TODO: Connect
class CreateGroup extends WithInputs {
  state = { authUsers: [], groupName: '' }

  toggleAuthUser = id => {
    const { authUsers } = this.state
    const updatedAuthUsers = authUsers.includes(id)
      ? authUsers.filter(authUserId => authUserId !== id)
      : [ id, ...authUsers ]
    this.setState({ authUsers: updatedAuthUsers })
  }

  createGroup = async () => {
    const { groupName, authUsers } = this.state
    const { userId } = this.props
    try {
      const result = await createGroup({ name: groupName, authUsers: [ userId, ...authUsers ] }, true)
      const groupId = result.data.createGroup.id
      await Promise.all(authUsers.map(username => createGroupLink({
        groupLinkUserId: username, groupLinkGroupId: groupId
      }, true)))
      this.props.navigation.navigate(GROUP, { groupId, groupName })
    } catch (error) {
      console.log('Error creating group:', error)
    }
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

const CreateGroupWithContext = props => (
  <UserContext.Consumer>
    {user => <CreateGroup userId={user.id} {...props} />}
  </UserContext.Consumer>
)

export default CreateGroupWithContext
