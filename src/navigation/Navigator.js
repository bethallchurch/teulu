import React from 'react'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import AlbumStack, { CreateAlbumStack } from '@album/AlbumNavigation'
import GroupStack, { CreateGroupStack, GroupMembersStack } from '@group/GroupNavigation'
import { ResetPasswordStack, ResetPhoneNumberStack, NotificationSettingsStack } from '@user/UserNavigation'
import AlbumListScreen from '@album/screens/AlbumListScreen'
import GroupListScreen from '@group/screens/GroupListScreen'
import UserSettingsScreen from '@user/screens/UserSettingsScreen'
import TabBarIcon from '@navigation/components/TabBarIcon'
import * as routes from '@navigation/routes'
import { bottomTabNavigatorStyle } from '@navigation/styles'

const MainAppTabs = createBottomTabNavigator({
  [routes.HOME]: {
    screen: AlbumListScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      tabBarIcon: ({ focused }) => <TabBarIcon name='home' focused={focused} />
    })
  },
  [routes.GROUP_LIST]: {
    screen: GroupListScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Groups',
      tabBarIcon: ({ focused }) => <TabBarIcon name='people' focused={focused} />
    })
  },
  [routes.USER_SETTINGS]: {
    screen: UserSettingsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Profile',
      tabBarIcon: ({ focused }) => <TabBarIcon name='person' focused={focused} />
    })
  }
}, {
  tabBarOptions: {
    style: bottomTabNavigatorStyle.container,
    labelStyle: bottomTabNavigatorStyle.label
  }
})

const MainStack = createStackNavigator({
  [routes.GROUP]: GroupStack,
  [routes.ALBUM]: AlbumStack,
  [routes.MAIN_APP]: MainAppTabs,
  [routes.GROUP_MEMBERS]: GroupMembersStack,
  [routes.RESET_PASSWORD]: ResetPasswordStack,
  [routes.RESET_PHONE_NUMBER]: ResetPhoneNumberStack,
  [routes.NOTIFICATION_SETTINGS]: NotificationSettingsStack
}, {
  headerMode: 'none'
})

const Navigator = createStackNavigator({
  [routes.MAIN_APP]: MainStack,
  [routes.CREATE_GROUP]: CreateGroupStack,
  [routes.CREATE_ALBUM]: CreateAlbumStack
}, {
  headerMode: 'none',
  mode: 'modal'
})

export default Navigator
