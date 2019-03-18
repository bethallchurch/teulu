import React from 'react'
import { createStackNavigator } from 'react-navigation'
import CreateGroupScreen from '@group/screens/CreateGroupScreen'
import GroupSettingsScreen from '@group/screens/GroupSettingsScreen'
import HeaderIcon from '@navigation/components/HeaderIcon'
import { stackNavigatorStyle } from '@navigation/styles'

export const CreateGroupStack = createStackNavigator({
  CreateGroupScreen: {
    screen: CreateGroupScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Create Group',
      headerRight: <HeaderIcon iconName='close' onPress={() => navigation.goBack(null)} />
    })
  }
}, {
  defaultNavigationOptions: stackNavigatorStyle
})

export const GroupSettingsStack = createStackNavigator({
  GroupSettingsScreen: {
    screen: GroupSettingsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Group Info',
      headerRight: <HeaderIcon iconName='close' onPress={() => navigation.goBack(null)} />
    })
  }
}, {
  defaultNavigationOptions: stackNavigatorStyle
})
