import React, { Component } from 'react'
import { View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { listGroups } from '@groups/GroupService'

class GroupList extends Component {
  state = { groups: [] }

  async componentDidMount () {
    try {
      const groups = await listGroups()
      this.setState({ groups })
    } catch (error) {
      console.log('Error listing groups:', error)
    }
  }

  navigateToGroup = (id, name) => this.props.navigation.navigate('Group', {
    groupId: id,
    groupName: name
  })
  
  render () {
    return (
      <View>
        {this.state.groups.map(({ id, name, members }) => (
          <ListItem
            key={id}
            title={name}
            subtitle={members.join(', ')}
            bottomDivider
            onPress={() => this.navigateToGroup(id, name)}
          />
        ))}
      </View>
    )
  }
}

export default GroupList
