import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { ListItem } from 'react-native-elements'
import { GROUP_LIST } from '@navigation/routes'

export default class HomeScreen extends Component {

  render () {
    return (
      <SafeAreaView style={{ backgroundColor: '#f6f7f6', flex: 1 }}>
        <ListItem title='Groups' onPress={() => this.props.navigation.navigate(GROUP_LIST)} />
      </SafeAreaView>
    )
  }
}
