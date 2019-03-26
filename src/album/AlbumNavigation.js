import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { View } from 'react-native'
import * as routes from '@navigation/routes'
import PhotoListScreen from '@photo/screens/PhotoListScreen'
import CreateAlbumScreen from '@album/screens/CreateAlbumScreen'
import AlbumSettings from '@album/screens/AlbumSettingsScreen'
import HeaderIcon from '@navigation/components/HeaderIcon'
import { stackNavigatorStyle } from '@navigation/styles'

const AlbumStack = createStackNavigator({
  [routes.ALBUM]: {
    screen: PhotoListScreen,
    navigationOptions: ({ navigation }) => {
      const defaultOnPress = () => null
      return {
        headerLeft: <HeaderIcon name='arrow-left' type='material-community' onPress={() => navigation.goBack(null)} />,
        headerRight: (
          <View style={{ flexDirection: 'row' }}>
            <HeaderIcon
              name='photo'
              onPress={navigation.getParam('pickImage') || defaultOnPress}
            />
            <HeaderIcon
              name='dots-horizontal'
              type='material-community'
              onPress={() => navigation.navigate(routes.ALBUM_SETTINGS, {
                albumId: navigation.getParam('albumId')
              })}
            />
          </View>
        )
      }
    }
  },
  [routes.ALBUM_SETTINGS]: {
    screen: AlbumSettings,
    navigationOptions: ({ navigation }) => ({
      headerLeft: null,
      headerRight: <HeaderIcon name='close' onPress={() => navigation.goBack(null)} />
    })
  }
}, {
  defaultNavigationOptions: stackNavigatorStyle,
  mode: 'modal'
})

export const CreateAlbumStack = createStackNavigator({
  [routes.CREATE_ALBUM]: {
    screen: CreateAlbumScreen,
    navigationOptions: ({ navigation }) => ({
      headerRight: <HeaderIcon name='close' onPress={() => navigation.goBack(null)} />
    })
  }
}, {
  defaultNavigationOptions: stackNavigatorStyle
})

export default AlbumStack
