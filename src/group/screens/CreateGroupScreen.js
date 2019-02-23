import React, { Component } from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { createGroup, createGroupLink } from '@group/GroupService'
import SelectContactList from '@contact/components/SelectContactList'
import { UserContext } from '@global/context'
import { GROUP } from '@navigation/routes'
import ComponentWithInputs from '@global/components/ComponentWithInputs'
import MinimalScreenBase from '@global/components/MinimalScreenBase'
import TextInput from '@global/components/TextInput'
import Button from '@global/components/Button'

class CreateGroup extends ComponentWithInputs {
  constructor (props) {
    super(props)
    this.state = {
      username: props.userId,
      members: [ props.userId ],
      groupName: '',
      step: 1
    }
  }

  toggleMember = id => {
    const { members } = this.state
    const updatedMembers = members.includes(id) ?
      members.filter(memberId => memberId !== id) :
      [ id, ...members ]
    this.setState({ members: updatedMembers })
  }

  createGroup = async () => {
    const { username, groupName, members } = this.state
    try {
      const result = await createGroup({ name: groupName, members })
      const groupId = result.data.createGroup.id
      members.forEach(async username => await createGroupLink({
        groupLinkUserId: username, groupLinkGroupId: groupId
      }))
      this.props.navigation.navigate(GROUP, { groupId, groupName })
    } catch (error) {
      console.log('Error creating group:', error)
    }
  }

  render () {
    const { groupName } = this.state
    // 6rem (96px)	5rem (80px)	3rem (48px)	2.25rem (36px)	1.5rem (24px)	1.25rem (20px)	1rem (16px)	.875rem (14px)
    return (
      <MinimalScreenBase>
        <Text style={{ fontSize: 36 }}>Name your group</Text>
        <TextInput
          placeholder='Group Name'
          value={groupName}
          returnKeyType='go'
          autoCorrect={false}
          onChangeText={value => this.onChangeText('groupName', value)}
        />
        <Text>Add members</Text>
        <SelectContactList
          selectedContacts={this.state.members}
          onPressContact={this.toggleMember}
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

const styles = StyleSheet.create({

})

export default CreateGroupWithContext
