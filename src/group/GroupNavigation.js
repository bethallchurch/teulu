import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { headerTitleStyles } from '@global/styles'
import CreateGroupScreen from '@group/screens/CreateGroupScreen'
import GroupSettings from '@group/components/GroupSettings'
import HeaderIcon from '@global/components/HeaderIcon'

export const CreateGroupStack = createStackNavigator({
  CreateGroup: {
    screen: CreateGroupScreen,
    headerTitleStyle: headerTitleStyles,
    navigationOptions: ({ navigation }) => ({
      title: 'Create Group',
      headerRight: <HeaderIcon iconName='close' onPress={() => navigation.goBack(null)} />
    })
  }
})

export const GroupSettingsStack = createStackNavigator({
  GroupSettings: {
    screen: GroupSettings,
    headerTitleStyle: headerTitleStyles,
    navigationOptions: ({ navigation }) => ({
      title: 'Settings',
      headerRight: <HeaderIcon iconName='close' onPress={() => navigation.goBack(null)} />
    })
  }
})
