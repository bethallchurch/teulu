import React from 'react'
import Amplify, { Hub } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import config from './aws-exports'
import AuthWatcher from '@auth/AuthWatcher'
import AlbumStack, { CreateAlbumStack, AlbumSettingsStack } from '@albums/AlbumNavigation'
import { CreateGroupStack, GroupSettingsStack } from '@groups/GroupNavigation'
import UserStack from '@user/UserNavigation'
import HeaderIcon from '@global/components/HeaderIcon'
import GroupsScreen from '@groups/components/GroupsScreen'
import GroupScreen from '@groups/components/GroupScreen'

Amplify.configure(config)

Hub.listen('auth', AuthWatcher)

const MainAppStack = createStackNavigator({
  Groups: {
    screen: GroupsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Groups',
      headerRight: <HeaderIcon iconName='person-outline' onPress={() => navigation.navigate('Profile')} />
    })
  },
  Group: {
    screen: GroupScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('groupName'),
      headerRight: (
        <HeaderIcon
          iconName='settings'
          onPress={() => navigation.navigate('GroupSettings', {
            groupId: navigation.getParam('groupId')
          })}
        />
      )
    })
  },
  Album: {
    screen: AlbumStack,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('albumName'),
      headerRight: (
        <HeaderIcon
          iconName='settings'
          onPress={() => navigation.navigate('AlbumSettings', {
            albumId: navigation.getParam('albumId')
          })}
        />
      )
    })
  }
})

const RootNavigator = createStackNavigator({
  MainApp: { screen: MainAppStack },
  CreateGroup: { screen: CreateGroupStack },
  GroupSettings: { screen: GroupSettingsStack },
  User: { screen: UserStack },
  CreateAlbum: { screen: CreateAlbumStack },
  AlbumSettings: { screen: AlbumSettingsStack }
}, {
  headerMode: 'none',
  mode: 'modal'
})

const App = createAppContainer(RootNavigator)

export default withAuthenticator(App, includeGreetings = false)
