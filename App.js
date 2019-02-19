import React, { Component } from 'react'
import Amplify from 'aws-amplify'
import { createAppContainer } from 'react-navigation'
import config from './aws-exports'
import AuthStack from '@auth/AuthNavigation'
import { Font } from 'expo'
import { font, fontBold } from '@global/styles'

Amplify.configure(config)

const AppNavigator = createAppContainer(AuthStack)

class App extends Component {
  state = { fontLoaded: false }
  
  async componentDidMount () {
    await Font.loadAsync({
      [font]: require('@assets/fonts/OpenSans/OpenSans-Regular.ttf'),
      [fontBold]: require('@assets/fonts/OpenSans/OpenSans-Bold.ttf')
    })
    this.setState({ fontLoaded: true })
  }
  
  render () {
    return this.state.fontLoaded ? <AppNavigator /> : null
  }
}

export default App
