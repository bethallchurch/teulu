import React, { Component } from 'react'
import { ListItem } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import { AUTH_LOADING } from '@navigation/routes'
import { signOut } from '@auth/AuthService'
import { colors, w4 } from '@global/styles'
import { logOutButtonStyle } from '@auth/styles'

export default class LogOutButton extends Component {
  logOut = async () => {
    try {
      await signOut()
      this.props.navigation.navigate(AUTH_LOADING)
    } catch (error) {
      const { message } = error
      console.log('Error signing out:', error)
      Alert.alert('Something went wrong!', message ? message : error)
    }
  }

  render () {
    return (
      <ListItem
        title='Log Out'
        onPress={this.logOut}
        containerStyle={logOutButtonStyle.container}
        titleStyle={logOutButtonStyle.title}
        rightIcon={<RightIcon />}
      />
    )
  }
}

const RightIcon = () => <AntDesign name='logout' size={w4.width} color={colors.primaryBackground} />

