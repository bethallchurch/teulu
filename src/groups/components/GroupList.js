import React, { Component } from 'react'
import { View } from 'react-native'
import { ListItem } from 'react-native-elements'

class GroupList extends Component {
  state = { groups: [{ id: 'gc', name: 'Gardening Club' }, { id: 'ldn', name: 'ldn' }] }

  navigateToGroup = () => this.props.navigation.navigate('Group')
  
  render () {
    return (
      <View>
        {this.state.groups.map(({ id, name }) => (
          <ListItem
            key={id}
            title={name}
            subtitle='...'
            bottomDivider
            onPress={this.navigateToGroup}
          />
        ))}
      </View>
    )
  }
}

export default GroupList
