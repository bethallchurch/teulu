import React from 'react'
import { View } from 'react-native'
import { createSwitchNavigator, createStackNavigator } from 'react-navigation'
import ForgotPasswordScreen from '@auth/components/ForgotPasswordScreen'
import LoadingScreen from '@auth/components/LoadingScreen'
import LoginScreen from '@auth/components/LoginScreen'
import RegisterScreen from '@auth/components/RegisterScreen'
import ResetPasswordScreen from '@auth/components/ResetPasswordScreen'
import Temp from '@auth/components/Temp'
import VerificationScreen from '@auth/components/VerificationScreen'
import App from '@App'

const AuthStack = createStackNavigator({

  Login: {
    screen: LoginScreen
  },
  Welcome: {
    screen: Temp
  },
  Register: {
    screen: RegisterScreen
  },
  ResetPassword: {
    screen: ResetPasswordScreen
  },
  ForgotPassword: {
    screen: ForgotPasswordScreen
  },
  Verification: {
    screen: VerificationScreen
  }
}, {
  headerMode: 'none'
})

export default createSwitchNavigator({
  AuthLoading: LoadingScreen,
  Auth: AuthStack,
  App: App
})
