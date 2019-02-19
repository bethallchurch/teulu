import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  AsyncStorage
} from 'react-native'
import { Auth } from 'aws-amplify'
import { offWhite } from '@global/styles'

export default class AuthLoadingScreen extends React.Component {
  state = { userToken: null }
  
  async componentDidMount () {
    await this.loadApp()
  }

  loadApp = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      this.setState({ userToken: user.signInUserSession.accessToken.jwtToken })
    } catch (error) {
      console.log(error)
    }
    this.props.navigation.navigate(this.state.userToken ? 'App' : 'Auth')
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
