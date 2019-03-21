import React, { Component } from 'react'
import { Alert } from 'react-native'
import { Icon } from 'react-native-elements'
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
        invert
        title='Log Out'
        onPress={this.logOut}
        rightIcon={<RightIcon />}
        containerStyle={this.props.containerStyle}
      />
    )
  }
}

const RightIcon = () => <Icon name='logout-variant' type='material-community' size={layout.s4} color={colors.primary} />
