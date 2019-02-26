import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import CreateAlbumScreen from '@album/screens/CreateAlbumScreen'
import AlbumSettings from '@album/components/AlbumSettings'
import MessagesScreen from '@message/components/MessagesScreen'
import PhotosScreen from '@photo/components/PhotosScreen'
import HeaderIcon from '@navigation/components/HeaderIcon'

export const CreateAlbumStack = createStackNavigator({
  CreateAlbum: {
    screen: CreateAlbumScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Create Album',
      headerRight: <HeaderIcon iconName='close' onPress={() => navigation.goBack(null)} />
    })
  }
})

export const AlbumSettingsStack = createStackNavigator({
  AlbumSettings: {
    screen: AlbumSettings,
    navigationOptions: ({ navigation }) => ({
      title: 'Settings',
      headerRight: <HeaderIcon iconName='close' onPress={() => navigation.goBack(null)} />
    })
  }
})

const AlbumStack = createMaterialTopTabNavigator({
  Messages: {
    screen: MessagesScreen
  },
  Photos: {
    screen: PhotosScreen
  }
}, {
  initialRouteName: 'Messages',
  tabBarOptions: {
    labelStyle: {
      color: '#000'
    },
    style: {
      backgroundColor: '#fff'
    },
    indicatorStyle: {
      backgroundColor: '#000'
    }
  }
})

export default AlbumStack
