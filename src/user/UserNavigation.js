import React from 'react'
import { createStackNavigator } from 'react-navigation'
import HeaderIcon from '@global/components/HeaderIcon'
import Profile from '@user/components/Profile'

const UserStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      title: 'My Account',
      headerRight: <HeaderIcon iconName='close' onPress={() => navigation.goBack(null)} />
    })
  }
})

export default UserStack
