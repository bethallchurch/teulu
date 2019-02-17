import React, { Component } from 'react'
import Amplify from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react-native'
import { createAppContainer } from 'react-navigation'
import config from './aws-exports'
import { getOrCreateUser } from '@user/UserService'
import { UserContext } from '@global/context'
import Navigator from '@Navigator'
import AuthStack from '@auth/AuthNavigation'

Amplify.configure(config)

const NavigationContainer = createAppContainer(Navigator)

class App extends Component {
  state = { user: {} }

  async componentDidMount () {
    const user = await getOrCreateUser()
    this.setState({ user })
  }

  render () {
    return (
      <UserContext.Provider value={this.state.user}>
        <NavigationContainer />
      </UserContext.Provider>
    )
  }
}

export default AuthStack
