import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { SafeAreaView } from 'react-native'
import { headerTitleStyles } from '@global/styles'
import AlbumStack, { CreateAlbumStack, AlbumSettingsStack } from '@albums/AlbumNavigation'
import { CreateGroupStack, GroupSettingsStack } from '@groups/GroupNavigation'
import UserStack from '@user/UserNavigation'
import HeaderIcon from '@global/components/HeaderIcon'
import GroupsScreen from '@groups/components/GroupsScreen'
import GroupScreen from '@groups/components/GroupScreen'
import * as routes from '@navigation/routes'

const HomeScreen = () => <SafeAreaView style={{ backgroundColor: '#f6f7f6', flex: 1 }} />

const MainAppStack = createStackNavigator({
  'Home': {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      headerTitleStyle: headerTitleStyles,
      headerRight: (
        <HeaderIcon
          iconName='person-outline'
          onPress={() => navigation.navigate(routes.USER_SETTINGS)}
        />
      )
    })
  },
  [routes.GROUPS]: {
    screen: GroupsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Groups',
      headerTitleStyle: headerTitleStyles,
      headerRight: (
        <HeaderIcon
          iconName='person-outline'
          onPress={() => navigation.navigate(routes.USER_SETTINGS)}
        />
      )
    })
  },
  [routes.GROUP]: {
    screen: GroupScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('groupName'),
      headerTitleStyle: headerTitleStyles,
      headerRight: (
        <HeaderIcon
          iconName='settings'
          onPress={() => navigation.navigate(routes.GROUP_SETTINGS, {
            groupId: navigation.getParam('groupId')
          })}
        />
      )
    })
  },
  [routes.ALBUM]: {
    screen: AlbumStack,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('albumName'),
      headerTitleStyle: headerTitleStyles,
      headerRight: (
        <HeaderIcon
          iconName='settings'
          onPress={() => navigation.navigate(routes.ALBUM_SETTINGS, {
            albumId: navigation.getParam('albumId')
          })}
        />
      )
    })
  }
})

const Navigator = createStackNavigator({
  [routes.MAIN_APP]: { screen: MainAppStack },
  [routes.CREATE_GROUP]: { screen: CreateGroupStack },
  [routes.GROUP_SETTINGS]: { screen: GroupSettingsStack },
  [routes.USER]: { screen: UserStack },
  [routes.CREATE_ALBUM]: { screen: CreateAlbumStack },
  [routes.ALBUM_SETTINGS]: { screen: AlbumSettingsStack }
}, {
  headerMode: 'none',
  mode: 'modal'
})

export default Navigator
