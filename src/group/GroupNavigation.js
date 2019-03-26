import React from 'react'
import { createStackNavigator } from 'react-navigation'
import * as routes from '@navigation/routes'
import AlbumListScreen from '@album/screens/AlbumListScreen'
import CreateGroupScreen from '@group/screens/CreateGroupScreen'
import UpdateGroupScreen from '@group/screens/UpdateGroupScreen'
import GroupSettingsScreen from '@group/screens/GroupSettingsScreen'
import GroupMembersScreen from '@group/screens/GroupMembersScreen'
import HeaderIcon from '@navigation/components/HeaderIcon'
import { stackNavigatorStyle } from '@navigation/styles'

const GroupStack = createStackNavigator({
  [routes.GROUP]: {
    screen: AlbumListScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderIcon name='arrow-left' type='material-community' onPress={() => navigation.goBack(null)} />,
      headerRight: (
        <HeaderIcon
          name='dots-horizontal'
          type='material-community'
          onPress={() => navigation.navigate(routes.GROUP_SETTINGS, {
            groupId: navigation.getParam('groupId')
          })}
        />
      )
    })
  },
  [routes.GROUP_SETTINGS]: {
    screen: GroupSettingsScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: null,
      headerRight: <HeaderIcon name='close' onPress={() => navigation.goBack(null)} />
    })
  }
}, {
  defaultNavigationOptions: stackNavigatorStyle,
  mode: 'modal'
})

export const CreateGroupStack = createStackNavigator({
  [routes.CREATE_GROUP]: {
    screen: CreateGroupScreen,
    navigationOptions: ({ navigation }) => ({
      headerRight: <HeaderIcon name='close' onPress={() => navigation.goBack(null)} />
    })
  }
}, {
  defaultNavigationOptions: stackNavigatorStyle
})

export const GroupMembersStack = createStackNavigator({
  [routes.GROUP_MEMBERS]: {
    screen: GroupMembersScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderIcon name='arrow-left' type='material-community' onPress={() => navigation.goBack(null)} />
    })
  }
}, {
  defaultNavigationOptions: stackNavigatorStyle
})

export const UpdateGroupStack = createStackNavigator({
  [routes.UPDATE_GROUP]: {
    screen: UpdateGroupScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderIcon name='arrow-left' type='material-community' onPress={() => navigation.goBack(null)} />
    })
  }
}, {
  defaultNavigationOptions: stackNavigatorStyle
})

export default GroupStack
