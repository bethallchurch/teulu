import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { CreateAlbumStack, AlbumSettingsStack } from '@album/AlbumNavigation'
import GroupStack, { CreateGroupStack, GroupSettingsStack } from '@group/GroupNavigation'
import UserStack from '@user/UserNavigation'
import HeaderIcon from '@navigation/components/HeaderIcon'
import GroupListScreen from '@group/screens/GroupListScreen'
import AlbumListScreen from '@album/screens/AlbumListScreen'
import PhotoListScreen from '@photo/screens/PhotoListScreen'
import HomeScreen from '@home/screens/HomeScreen'
import * as routes from '@navigation/routes'
import { colors, layout } from '@global/styles'
import { stackNavigatorStyle } from '@navigation/styles'

const MainAppStack = createStackNavigator({
  [routes.HOME]: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      headerRight: (
        <HeaderIcon
          iconName='person-outline'
          onPress={() => navigation.navigate(routes.USER_SETTINGS)}
        />
      )
    })
  },
  [routes.GROUP_LIST]: {
    screen: GroupListScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Groups'
    })
  },
  [routes.PHOTO_LIST]: {
    screen: PhotoListScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'All Photos'
    })
  },
  [routes.ALBUM_LIST]: {
    screen: AlbumListScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'All Albums'
    })
  },
  [routes.GROUP]: {
    screen: GroupStack,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('groupName'),
      headerRight: (
        <HeaderIcon
          icon={<MaterialCommunityIcons name='dots-vertical' size={layout.s4} color={colors.textDefault} />}
          onPress={() => navigation.navigate(routes.GROUP_SETTINGS, {
            groupId: navigation.getParam('groupId')
          })}
        />
      )
    })
  },
  [routes.ALBUM]: {
    screen: PhotoListScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('albumName'),
      headerRight: (
        <HeaderIcon
          icon={<MaterialCommunityIcons name='dots-vertical' size={layout.s4} color={colors.textDefault} />}
          onPress={() => navigation.navigate(routes.ALBUM_SETTINGS, {
            albumId: navigation.getParam('albumId')
          })}
        />
      )
    })
  }
}, {
  defaultNavigationOptions: stackNavigatorStyle
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
