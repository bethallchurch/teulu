import React from 'react'
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import * as routes from '@navigation/routes'
import ForgotPasswordScreen from '@auth/screens/ForgotPasswordScreen'
import LoadingScreen from '@auth/screens/LoadingScreen'
import LoginScreen from '@auth/screens/LoginScreen'
import RegisterScreen from '@auth/screens/RegisterScreen'
import TabBarIcon from '@navigation/components/TabBarIcon'
import { default as MainApp } from '@navigation/Navigator'
import { tabBarStyle, tabBarLabelStyle } from '@navigation/styles'

const AuthTabs = createBottomTabNavigator({
  [routes.LOGIN]: {
    screen: LoginScreen,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <TabBarIcon name='login' focused={focused} />
    }
  },
  [routes.REGISTER]: {
    screen: RegisterScreen,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <TabBarIcon name='adduser' focused={focused} />
    }
  }
}, { tabBarOptions: { style: tabBarStyle.style, labelStyle: tabBarLabelStyle.style }
})

const AuthStack = createStackNavigator({
  [routes.AUTH_TABS]: AuthTabs,
  [routes.FORGOT_PASSWORD]: ForgotPasswordScreen
}, {
  headerMode: 'none'
})

export default createSwitchNavigator({
  [routes.AUTH_LOADING]: LoadingScreen,
  [routes.AUTH]: AuthStack,
  [routes.APP]: MainApp
})
