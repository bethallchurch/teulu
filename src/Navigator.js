import React from 'react'
import { createStackNavigator } from 'react-navigation'
import AlbumStack, { CreateAlbumStack, AlbumSettingsStack } from '@albums/AlbumNavigation'
import { CreateGroupStack, GroupSettingsStack } from '@groups/GroupNavigation'
import UserStack from '@user/UserNavigation'
import HeaderIcon from '@global/components/HeaderIcon'
import GroupsScreen from '@groups/components/GroupsScreen'
import GroupScreen from '@groups/components/GroupScreen'

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

export default RootNavigator
