import React from 'react'
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import { MaterialIcons } from '@expo/vector-icons'
import { headerTitleStyle } from '@navigation/styles'
import MessagesScreen from '@message/screens/MessagesScreen'
import GroupScreen from '@album/screens/AlbumListScreen'
import CreateGroupScreen from '@group/screens/CreateGroupScreen'
import GroupSettingsScreen from '@group/screens/GroupSettingsScreen'
import HeaderIcon from '@navigation/components/HeaderIcon'
import { colors, w4 } from '@global/styles'

const GroupStack = createMaterialTopTabNavigator({
  Group: {
    screen: MessagesScreen,
    navigationOptions: {
      title: 'Chat',
      tabBarIcon: () => <MaterialIcons name='chat' color={colors.primaryBackground} size={w4.width} />
    }
  },
  Albums: {
    screen: GroupScreen,
    navigationOptions: {
      tabBarIcon: () => <MaterialIcons name='photo-library' color={colors.primaryBackground} size={w4.width} />
    }
  }
}, {
  initialRouteName: 'Group',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    style: {
      backgroundColor: colors.textDefault
    },
    indicatorStyle: {
      backgroundColor: colors.primary,
      height: 2
    }
  }
})

export const CreateGroupStack = createStackNavigator({
  CreateGroupScreen: {
    screen: CreateGroupScreen,
    headerTintColor: colors.textDefault,
    headerTitleStyle: headerTitleStyle.style,
    navigationOptions: ({ navigation }) => ({
      title: 'Create Group',
      headerRight: <HeaderIcon iconName='close' onPress={() => navigation.goBack(null)} />
    })
  }
})

export const GroupSettingsStack = createStackNavigator({
  GroupSettingsScreen: {
    screen: GroupSettingsScreen,
    headerTintColor: colors.textDefault,
    headerTitleStyle: headerTitleStyle.style,
    navigationOptions: ({ navigation }) => ({
      title: 'Group Info',
      headerRight: <HeaderIcon iconName='close' onPress={() => navigation.goBack(null)} />
    })
  }
})

export default GroupStack
