import React from 'react'
import { createStackNavigator } from 'react-navigation'
import GroupsScreen from '@groups/components/GroupsScreen'
import CreateGroup from '@groups/components/CreateGroup'
import HeaderIcon from '@global/components/HeaderIcon'

export const CreateGroupStack = createStackNavigator({
  CreateGroup: {
    screen: CreateGroup,
    navigationOptions: ({ navigation }) => ({
      title: 'Create Group',
      headerRight: <HeaderIcon iconName='close' onPress={() => navigation.goBack(null)} />
    })
  }
})
