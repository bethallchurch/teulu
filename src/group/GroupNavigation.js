import React from 'react'
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import { MaterialIcons } from '@expo/vector-icons'
import MessagesScreen from '@message/screens/MessageListScreen'
import GroupScreen from '@album/screens/AlbumListScreen'
import CreateGroupScreen from '@group/screens/CreateGroupScreen'
import GroupSettingsScreen from '@group/screens/GroupSettingsScreen'
import HeaderIcon from '@navigation/components/HeaderIcon'
import { colors, layout } from '@global/styles'
import { stackNavigatorStyle } from '@navigation/styles'

const GroupStack = createMaterialTopTabNavigator({
  Group: {
    screen: MessagesScreen,
    navigationOptions: {
      title: 'Chat',
      tabBarIcon: () => <MaterialIcons name='chat' color={colors.primaryBackground} size={layout.s4} />
    }
  },
  Albums: {
    screen: GroupScreen,
    navigationOptions: {
      tabBarIcon: () => <MaterialIcons name='photo-library' color={colors.primaryBackground} size={layout.s4} />
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
    navigationOptions: ({ navigation }) => ({
      title: 'Create Group',
      headerRight: <HeaderIcon iconName='close' onPress={() => navigation.goBack(null)} />
    })
  }
}, {
  defaultNavigationOptions: stackNavigatorStyle
})

export const GroupSettingsStack = createStackNavigator({
  GroupSettingsScreen: {
    screen: GroupSettingsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Group Info',
      headerRight: <HeaderIcon iconName='close' onPress={() => navigation.goBack(null)} />
    })
  }
}, {
  defaultNavigationOptions: stackNavigatorStyle
})

export default GroupStack
