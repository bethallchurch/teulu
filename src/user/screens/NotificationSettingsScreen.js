import React, { Component } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { titleStyle, colors } from '@global/styles'

export default class NotificationSettingsScreen extends Component {
  render () {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primaryBackgroundColor }}>
        <Text style={titleStyle.style}>Coming Soon</Text>
      </SafeAreaView>
    )
  }
}
