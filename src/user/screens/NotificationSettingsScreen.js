import React, { Component } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { headerTitleStyles } from '@global/styles'

export default class NotificationSettingsScreen extends Component {
  render () {
    return (
      <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={headerTitleStyles}>Coming Soon</Text>
      </SafeAreaView>
    )
  }
}
