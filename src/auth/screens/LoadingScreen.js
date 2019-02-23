import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { offWhite } from '@global/styles'
import { APP, AUTH } from '@navigation/routes'
import { getAuthUser } from '@auth/AuthService'

export default class AuthLoadingScreen extends Component {
  state = { userToken: null }
  
  async componentDidMount () {
    await this.loadApp()
  }

  loadApp = async () => {
    try {
      const user = await getAuthUser()
      this.setState({ userToken: user.signInUserSession.accessToken.jwtToken })
    } catch (error) {
      console.log(error)
    }
    this.props.navigation.navigate(this.state.userToken ? APP : AUTH)
  }

  render () {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#fff' />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: offWhite,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
