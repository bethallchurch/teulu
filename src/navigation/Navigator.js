import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { headerTitleStyle } from '@navigation/styles'
import AlbumStack, { CreateAlbumStack, AlbumSettingsStack } from '@album/AlbumNavigation'
import GroupStack, { CreateGroupStack, GroupSettingsStack } from '@group/GroupNavigation'
import UserStack from '@user/UserNavigation'
import HeaderIcon from '@navigation/components/HeaderIcon'
import GroupListScreen from '@group/screens/GroupListScreen'
import HomeScreen from '@home/screens/HomeScreen'
import * as routes from '@navigation/routes'
import { colors, w4 } from '@global/styles'
import GroupScreen from '@album/screens/AlbumListScreen'

const Temp = () => <View />

const MainAppStack = createStackNavigator({
  [routes.HOME]: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      headerTintColor: colors.textDefault,
      headerTitleStyle: headerTitleStyle.style,
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
      title: 'Groups',
      headerTintColor: colors.textDefault,
      headerTitleStyle: headerTitleStyle.style
    })
  },
  [routes.GROUP]: {
    screen: GroupStack,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('groupName'),
      headerTintColor: colors.textDefault,
      headerTitleStyle: headerTitleStyle.style,
      headerRight: (
        <HeaderIcon
          icon={<MaterialCommunityIcons name='dots-vertical' size={w4.width} color={colors.textDefault} />}
          onPress={() => navigation.navigate(routes.GROUP_SETTINGS, {
            groupId: navigation.getParam('groupId')
          })}
        />
      )
    })
  },
  [routes.ALBUM]: {
    screen: Temp,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('albumName'),
      headerTintColor: colors.textDefault,
      headerTitleStyle: headerTitleStyle.style,
      headerRight: (
        <HeaderIcon
          icon={<MaterialCommunityIcons name='dots-vertical' size={w4.width} color={colors.textDefault} />}
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
