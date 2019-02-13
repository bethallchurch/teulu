import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import CreateAlbum from '@albums/components/CreateAlbum'
import AlbumSettings from '@albums/components/AlbumSettings'
import HeaderIcon from '@global/components/HeaderIcon'

const Feed = () => <View><Text>Feed Placeholder</Text></View>
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
  Feed: {
    screen: Feed
  },
  Photos: {
    screen: Photos
  }
}, {
  initialRouteName: 'Feed',
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
