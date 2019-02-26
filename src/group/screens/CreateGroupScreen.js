import React from 'react'
import { Text } from 'react-native'
import { createGroup, createGroupLink } from '@group/GroupService'
import SelectContactList from '@contact/components/SelectContactList'
import { UserContext } from '@global/context'
import { GROUP } from '@navigation/routes'
import ComponentWithInputs from '@global/components/ComponentWithInputs'
import MinimalScreenBase from '@global/components/MinimalScreenBase'
import TextInput from '@global/components/TextInput'
import Button from '@global/components/Button'
import { subtitleStyle, mt2 } from '@global/styles'

class CreateGroup extends ComponentWithInputs {
  state = { authUsers: [], groupName: '' }

  toggleAuthUser = id => {
    const { authUsers } = this.state
    const updatedAuthUsers = authUsers.includes(id) ?
      authUsers.filter(authUserId => authUserId !== id) :
      [ id, ...authUsers ]
    this.setState({ authUsers: updatedAuthUsers })
  }

  createGroup = async () => {
    const { groupName, authUsers } = this.state
    const { userId } = this.props
    try {
      const result = await createGroup({ name: groupName, authUsers: [ userId, ...authUsers ]})
      const groupId = result.data.createGroup.id
      await Promise.all(authUsers.map(username => createGroupLink({
        groupLinkUserId: username, groupLinkGroupId: groupId
      })))
      this.props.navigation.navigate(GROUP, { groupId, groupName })
    } catch (error) {
      console.log('Error creating group:', error)
    }
  }

  render () {
    const { groupName, authUsers } = this.state
    return (
      <MinimalScreenBase>      
        <Text style={subtitleStyle.style}>Name your group</Text>
        <TextInput
          placeholder='Group Name'
          value={groupName}
          returnKeyType='go'
          autoCorrect={false}
          onChangeText={value => this.onChangeText('groupName', value)}
        />
        <Text style={{ ...mt2, ...subtitleStyle.style }}>Add members</Text>
        <SelectContactList
          selectedContacts={authUsers}
          onPressContact={this.toggleAuthUser}
        />
        <Button onPress={this.createGroup}>Create Group</Button>
      </MinimalScreenBase>
    )
  }
}

const CreateGroupWithContext = props => (
  <UserContext.Consumer>
    {user => <CreateGroup userId={user.id} {...props} />}
  </UserContext.Consumer>
)

export default CreateGroupWithContext
