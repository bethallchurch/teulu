import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import { AUTH_LOADING } from '@navigation/routes'
import { signOut } from '@auth/AuthService'
import { green, offWhite } from '@global/styles'

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
        containerStyle={styles.container}
        titleStyle={styles.title}
        rightIcon={<RightIcon />}
      />
    )
  }
}

const RightIcon = () => <AntDesign name='logout' size={24} color={offWhite} />

const styles = StyleSheet.create({
  container: {
    backgroundColor: green
  },
  title: {
    color: offWhite,
    fontFamily: 'OpenSans-Bold'
  }
})