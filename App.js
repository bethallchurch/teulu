import React, { Component } from 'react'
import Amplify from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react-native'
import { createAppContainer } from 'react-navigation'
import config from './aws-exports'
import { getOrCreateUser } from '@user/UserService'
import AppContext from '@global/context/AppContext'
import Navigator from '@Navigator'

Amplify.configure(config)

const NavigationContainer = createAppContainer(Navigator)

class App extends Component {
  state = { userId: '' }
  
  async componentDidMount () {
    const user = await getOrCreateUser()
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

export default withAuthenticator(App, includeGreetings = false)
