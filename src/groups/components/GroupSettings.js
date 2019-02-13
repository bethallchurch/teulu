import React, { Component } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import { getGroup } from '@groups/GroupService'

class GroupSettings extends Component {
  state = { name: '', owner: '', members: [] }

  async componentDidMount () {
    const id = this.props.navigation.getParam('groupId')
    try {
      const result = await getGroup(id)
      const { name, members, owner } = result.data.getGroup
      this.setState({ name, members, owner })
    } catch (error) {
      console.log(error)
    }
  }
  
  render () {
    return (
      <SafeAreaView>
        <Card containerStyle={{ paddingHorizontal: 0 }}>
          <ListItem title={this.state.name} leftElement={<Text>Name</Text>} />
          <ListItem title={this.state.owner} leftElement={<Text>Owner</Text>}  />
          <ListItem title={this.state.members.join(', ')} leftElement={<Text>Members</Text>}  />
        </Card>
      </SafeAreaView>
    )
  }
}

export default GroupSettings
