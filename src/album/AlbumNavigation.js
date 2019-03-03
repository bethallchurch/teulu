import React from 'react'
import { createStackNavigator } from 'react-navigation'
import CreateAlbumScreen from '@album/screens/CreateAlbumScreen'
import AlbumSettings from '@album/screens/AlbumSettingsScreen'
import HeaderIcon from '@navigation/components/HeaderIcon'
import { stackNavigatorStyle } from '@navigation/styles'

export const CreateAlbumStack = createStackNavigator({
  CreateAlbum: {
    screen: CreateAlbumScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Create Album',
      headerRight: <HeaderIcon iconName='close' onPress={() => navigation.goBack(null)} />
    })
  }
}, {
  defaultNavigationOptions: stackNavigatorStyle
})

export const AlbumSettingsStack = createStackNavigator({
  AlbumSettings: {
    screen: AlbumSettings,
    navigationOptions: ({ navigation }) => ({
      title: 'Settings',
      headerRight: <HeaderIcon iconName='close' onPress={() => navigation.goBack(null)} />
    })
  }
}, {
  defaultNavigationOptions: stackNavigatorStyle
})
