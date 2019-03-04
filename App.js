import React, { Component } from 'react'
import Amplify, { Hub } from 'aws-amplify'
import { createAppContainer } from 'react-navigation'
import { Font } from 'expo'
import config from './aws-exports'
import AuthStack from '@auth/AuthNavigation'
import { getOrCreateUser } from '@user/UserService'
import { fontRegular, fontLight, fontMedium } from '@global/styles/typography'
import { UserContext } from '@global/context'
import { Loading } from '@global/components'

Amplify.configure(config)

const AppNavigator = createAppContainer(AuthStack)

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { fontLoaded: false, user: null }
    Hub.listen('auth', this)
  }

  async componentDidMount () {
    this.setUser()
    await Font.loadAsync({
      [fontRegular.fontFamily]: require('@assets/fonts/Lato/Lato-Regular.ttf'),
      [fontMedium.fontFamily]: require('@assets/fonts/Lato/Lato-Bold.ttf'),
      [fontLight.fontFamily]: require('@assets/fonts/Lato/Lato-Light.ttf')
    })
    this.setState({ fontLoaded: true })
  }

  async setUser () {
    const user = await getOrCreateUser()
    this.setState({ user: user || 'not authenticated' })
  }

  async onHubCapsule (capsule) {
    if (capsule.payload.event === 'signIn') {
      this.setUser()
    }
  }

  render () {
    const { fontLoaded, user } = this.state
    return fontLoaded && user ? (
      <UserContext.Provider value={user}>
        <AppNavigator
          persistenceKey='persistenceKey004'
          renderLoadingExperimental={() => <Loading />}
        />
      </UserContext.Provider>
    ) : <Loading />
  }
}

export default App
