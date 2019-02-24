import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { headerTitleStyle } from '@navigation/styles'
import CreateGroupScreen from '@group/screens/CreateGroupScreen'
import GroupSettingsScreen from '@group/screens/GroupSettingsScreen'
import HeaderIcon from '@navigation/components/HeaderIcon'
import { colors } from '@global/styles'

export const CreateGroupStack = createStackNavigator({
  CreateGroupScreen: {
    screen: CreateGroupScreen,
    headerTintColor: colors.textDefault,
    headerTitleStyle: headerTitleStyle.style,
    navigationOptions: ({ navigation }) => ({
      title: 'Create Group',
      headerRight: <HeaderIcon iconName='close' onPress={() => navigation.goBack(null)} />
    })
  }
})

export const GroupSettingsStack = createStackNavigator({
  GroupSettingsScreen: {
    screen: GroupSettingsScreen,
    headerTintColor: colors.textDefault,
    headerTitleStyle: headerTitleStyle.style,
    navigationOptions: ({ navigation }) => ({
      title: 'Group Info',
      headerRight: <HeaderIcon iconName='close' onPress={() => navigation.goBack(null)} />
    })
  }
})
