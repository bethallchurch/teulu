import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { Text } from '@global/components'
import { colors } from '@global/styles'

export default class NotificationSettingsScreen extends Component {
  render () {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primaryBackground }}>
        <Text subtitleTwo>Coming Soon</Text>
      </SafeAreaView>
    )
  }
}
