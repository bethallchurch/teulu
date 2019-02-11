import React from 'react'
import Amplify, { Hub } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import config from './aws-exports'
import AuthWatcher from '@auth/AuthWatcher'
import AlbumStack, { CreateAlbumStack } from '@albums/AlbumNavigation'
import { CreateGroupStack } from '@groups/GroupNavigation'
import UserStack from '@user/UserNavigation'
import HeaderIcon from '@global/components/HeaderIcon'
import AlbumsScreen from '@albums/components/AlbumsScreen'
import GroupsScreen from '@groups/components/GroupsScreen'

Amplify.configure(config)

Hub.listen('auth', AuthWatcher)

const MainAppStack = createStackNavigator({
  Groups: {
    screen: GroupsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'My Groups',
      headerRight: <HeaderIcon iconName='person-outline' onPress={() => navigation.navigate('Profile')} />
    })
  },
  Group: {
    screen: AlbumsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Group'
    })
  },
  Album: {
    screen: AlbumStack,
    navigationOptions: ({ navigation }) => ({
      title: 'Album Title'
    })
  }
})

const RootNavigator = createStackNavigator({
  MainApp: { screen: MainAppStack },
  CreateGroup: { screen: CreateGroupStack },
  User: { screen: UserStack },
  CreateAlbum: { screen: CreateAlbumStack }
}, {
  headerMode: 'none',
  mode: 'modal'
})

const App = createAppContainer(RootNavigator)

export default withAuthenticator(App, includeGreetings = false)
