import React, { Component } from 'react'
import {
  AsyncStorage,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Alert
} from 'react-native'
import Amplify, { Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react-native'
import { createAppContainer } from 'react-navigation'
import { getOrCreateUser } from '@user/UserService'
import { UserContext } from '@global/context'
import { AUTH_LOADING } from '@navigation/routes'
import Navigator from '@navigation/Navigator'

class App extends Component {
  state = { user: {} }

  async componentDidMount () {
    const user = await getOrCreateUser()
    this.setState({ user })
  }

  render () {
    return (
      <UserContext.Provider value={this.state.user}>
        <Navigator {...this.props} />
      </UserContext.Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aa73b7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle: {
    padding: 20
  },
  textStyle: {
    fontSize: 18,
    padding: 10
  }
})

export default Navigator
