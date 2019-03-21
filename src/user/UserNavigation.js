import React from 'react'
import { createStackNavigator } from 'react-navigation'
import * as routes from '@navigation/routes'
import HeaderIcon from '@navigation/components/HeaderIcon'
import ResetPasswordScreen from '@user/screens/ResetPasswordScreen'
import ResetPhoneNumberScreen from '@user/screens/ResetPhoneNumberScreen'
import NotificationSettingsScreen from '@user/screens/NotificationSettingsScreen'
import { stackNavigatorStyle } from '@navigation/styles'

export const ResetPasswordStack = createStackNavigator({
  [routes.RESET_PASSWORD]: {
    screen: ResetPasswordScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderIcon name='arrow-left' type='material-community' onPress={() => navigation.goBack(null)} />
    })
  }
}, {
  defaultNavigationOptions: stackNavigatorStyle
})

export const ResetPhoneNumberStack = createStackNavigator({
  [routes.RESET_PHONE_NUMBER]: {
    screen: ResetPhoneNumberScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderIcon name='arrow-left' type='material-community' onPress={() => navigation.goBack(null)} />
    })
  }
}, {
  defaultNavigationOptions: stackNavigatorStyle
})

export const NotificationSettingsStack = createStackNavigator({
  [routes.NOTIFICATION_SETTINGS]: {
    screen: NotificationSettingsScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderIcon name='arrow-left' type='material-community' onPress={() => navigation.goBack(null)} />
    })
  }
}, {
  defaultNavigationOptions: stackNavigatorStyle
})
