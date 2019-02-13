import React, { Component, createContext } from 'react'
import Amplify, { Hub } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react-native'
import { createAppContainer } from 'react-navigation'
import config from './aws-exports'
import { userInit } from '@user/UserService'
import AppContext from '@global/context/AppContext'
import Navigator from '@Navigator'

Amplify.configure(config)

const NavigationContainer = createAppContainer(Navigator)

class App extends Component {
  state = { userId: '' }
  
  async componentDidMount () {
    const user = await userInit()
    this.setState({ userId: user.id })
  }

  render () {
    return (
      <AppContext.Provider value={{ userId: this.state.userId }}>
        <NavigationContainer />
      </AppContext.Provider>
    )
  }
}

export default withAuthenticator(App, includeGreetings = true)
