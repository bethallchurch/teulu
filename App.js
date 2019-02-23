import React, { Component } from 'react'
import Amplify, { Hub } from 'aws-amplify'
import { createAppContainer } from 'react-navigation'
import { Font } from 'expo'
import config from './aws-exports'
import AuthStack from '@auth/AuthNavigation'
import { getOrCreateUser } from '@user/UserService'
import { font, fontBold } from '@global/styles'

Amplify.configure(config)

const AppNavigator = createAppContainer(AuthStack)

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { fontLoaded: false }
    Hub.listen('auth', this)
  }

  async componentDidMount () {
    await Font.loadAsync({
      [font]: require('@assets/fonts/OpenSans/OpenSans-Regular.ttf'),
      [fontBold]: require('@assets/fonts/OpenSans/OpenSans-Bold.ttf')
    })
    this.setState({ fontLoaded: true })
  }

  async onHubCapsule (capsule) {
    if (capsule.payload.event === 'signIn') {
      await getOrCreateUser()
    }
  }

  render () {
    return this.state.fontLoaded ? <AppNavigator /> : null
  }
}

export default App
