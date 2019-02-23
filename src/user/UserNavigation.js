import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { headerTitleStyle } from '@navigation/styles'
import HeaderIcon from '@navigation/components/HeaderIcon'
import UserSettingsScreen from '@user/screens/UserSettingsScreen'
import ResetPasswordScreen from '@user/screens/ResetPasswordScreen'
import ResetPhoneNumberScreen from '@user/screens/ResetPhoneNumberScreen'
import NotificationSettingsScreen from '@user/screens/NotificationSettingsScreen'
import * as routes from '@navigation/routes'

const UserSettingsStack = createStackNavigator({
  [routes.ACCOUNT]: {
    screen: UserSettingsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Account',
      headerTitleStyle: headerTitleStyle.style,
      headerRight: (
        <HeaderIcon iconName='close' onPress={() => navigation.goBack(null)} />
      )
    })
  },
  [routes.RESET_PASSWORD]: {
    screen: ResetPasswordScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Reset Password',
      headerTitleStyle: headerTitleStyle.style
    })
  },
  [routes.RESET_PHONE_NUMBER]: {
    screen: ResetPhoneNumberScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Update Phone Number',
      headerTitleStyle: headerTitleStyle.style
    })
  },
  [routes.NOTIFICATION_SETTINGS]: {
    screen: NotificationSettingsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Notifications',
      headerTitleStyle: headerTitleStyle.style
    })
  }
})

const UserStack = createStackNavigator({
  [routes.USER_SETTINGS]: UserSettingsStack
}, {
  headerMode: 'none'
})

export default UserStack
