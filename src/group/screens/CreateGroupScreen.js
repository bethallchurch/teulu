import React, { Component, Fragment } from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { createGroup, createGroupLink } from '@group/GroupService'
import SelectContactList from '@contact/components/SelectContactList'
import { UserContext } from '@global/context'
import { GROUP } from '@navigation/routes'

const StepOne = ({ onChangeText, onPressButton }) => (
  <Fragment>
    <Text>Name your group</Text>
    <Input onChangeText={onChangeText} />
    <Button
      buttonStyle={styles.button}
      containerStyle={styles.buttonContainer}
      onPress={onPressButton}
      title='Next'
    />
  </Fragment>
)

const StepTwo = ({ selectedContacts, onPressContact, onPressButton }) => (
  <Fragment>
    <Text>Add members</Text>
    <SelectContactList
      selectedContacts={selectedContacts}
      onPressContact={onPressContact}
    />
    <Button
      buttonStyle={styles.button}
      containerStyle={styles.buttonContainer}
      onPress={onPressButton}
      title='Create'
    />
  </Fragment>
)

class CreateGroup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: props.userId,
      members: [ props.userId ],
      groupName: '',
      step: 1
    }
  }

  updateGroupName = text => {
    this.setState({ groupName: text })
  }

  toggleMember = id => {
    const { members } = this.state
    const updatedMembers = members.includes(id) ?
      members.filter(memberId => memberId !== id) :
      [ id, ...members ]
    this.setState({ members: updatedMembers })
  }

  goToStepTwo = () => {
    this.setState({ step: 2 })
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
    return (
      <SafeAreaView>
        <View style={styles.container}>
          {this.state.step === 1 && (
            <StepOne
              onChangeText={this.updateGroupName}
              onPressButton={this.goToStepTwo}
            />
          )}
          {this.state.step === 2 && (
            <StepTwo
              onPressButton={this.createGroup}
              onPressContact={this.toggleMember}
              selectedContacts={this.state.members}
            />
          )}
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  buttonContainer: {
    marginTop: 15
  },
  button: {
    backgroundColor: '#000'
  }
})

const CreateGroupWithContext = props => (
  <UserContext.Consumer>
    {({ userId }) => <CreateGroup userId={userId} {...props} />}
  </UserContext.Consumer>
)

export default CreateGroupWithContext
