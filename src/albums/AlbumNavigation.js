import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import CreateAlbum from '@albums/components/CreateAlbum'
import AlbumSettings from '@albums/components/AlbumSettings'
import MessagesScreen from '@messages/components/MessagesScreen'
import HeaderIcon from '@global/components/HeaderIcon'

const Photos = () => <View><Text>Photos Placeholder</Text></View>

export const CreateAlbumStack = createStackNavigator({
  CreateAlbum: {
    screen: CreateAlbum,
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
    screen: Photos
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
