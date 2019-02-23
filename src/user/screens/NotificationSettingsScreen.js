import React, { Component } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { headerTitleStyles, offWhite } from '@global/styles'

export default class NotificationSettingsScreen extends Component {
  render () {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: offWhite }}>
        <Text style={headerTitleStyles}>Coming Soon</Text>
      </SafeAreaView>
    )
  }
}
