import React, { Component } from 'react'
import { Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { AUTH_LOADING } from '@navigation/routes'
import { signOut } from '@auth/AuthService'
import { colors, layout } from '@global/styles'
import { FullWidthButton } from '@global/components'

export default class LogOutButton extends Component {
  logOut = async () => {
    try {
      await signOut()
      this.props.navigation.navigate(AUTH_LOADING)
    } catch (error) {
      const { message } = error
      console.log('Error signing out:', error)
      Alert.alert('Something went wrong!', message || error)
    }
  }

  render () {
    return (
      <FullWidthButton
        title='Log Out'
        onPress={this.logOut}
        rightIcon={<RightIcon />}
      />
    )
  }
}

const RightIcon = () => <AntDesign name='logout' size={layout.s4} color={colors.primaryBackground} />
