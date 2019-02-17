import React from 'react'
import { View } from 'react-native'
import { createSwitchNavigator, createStackNavigator } from 'react-navigation'
import ForgotPasswordScreen from '@auth/components/ForgotPasswordScreen'
import LoadingScreen from '@auth/components/LoadingScreen'
import LoginScreen from '@auth/components/LoginScreen'
import RegisterScreen from '@auth/components/RegisterScreen'
import Temp from '@auth/components/Temp'
import VerificationScreen from '@auth/components/VerificationScreen'

const AuthStack = createStackNavigator({
  Welcome: {
    screen: Temp,
    navigationOptions: () => ({
      title: `Welcome to this App`, // for the header screen
      headerBackTitle: 'Back'
    })
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: () => ({
      title: `Create a new account`
    })
  },
  Verification: {
    screen: VerificationScreen,
    navigationOptions: () => ({
      title: `Enter verification code`
    })
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      title: `Log in to your account`
    })
  },
  ForgotPassword: {
    screen: ForgotPasswordScreen,
    navigationOptions: () => ({
      title: `Create a new password`
    })
  }
})

export default createSwitchNavigator({
  AuthLoading: LoadingScreen,
  Auth: AuthStack
})
