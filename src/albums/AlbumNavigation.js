import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import HeaderIcon from '@global/components/HeaderIcon'
import CreateAlbum from '@albums/components/CreateAlbum'

const Chat = () => <View><Text>Chat Placeholder</Text></View>
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

const AlbumStack = createMaterialTopTabNavigator({
  Chat: {
    screen: Chat
  },
  Photos: {
    screen: Photos
  }
}, {
  initialRouteName: 'Chat',
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
