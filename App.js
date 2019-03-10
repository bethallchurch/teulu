import React, { Component } from 'react'
import Amplify, { Hub } from 'aws-amplify'
import { ApolloProvider, ApolloConsumer } from 'react-apollo'
import { Rehydrated } from 'aws-appsync-react'
import { createAppContainer } from 'react-navigation'
import { Font, Permissions } from 'expo'
import config from './aws-exports'
import client from '@client'
import AuthStack from '@auth/AuthNavigation'
import { getOrCreateUser } from '@user/UserService'
import { fontRegular, fontLight, fontMedium } from '@global/styles/typography'
import { UserContext } from '@global/context'
import { Loading } from '@global/components'
import { LIST_PHONE_CONTACTS, listPhoneContacts } from '@contact/ContactService'

Amplify.configure(config)

const AppNavigator = createAppContainer(AuthStack)

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { fontLoaded: false, contactsLoaded: false, user: null }
    Hub.listen('auth', this)
  }

  componentDidMount () {
    this.loadContacts()
    this.loadFonts()
    this.loadUser()
  }

  async loadContacts () {
    // TODO: could delay this until logged in
    const { status } = await Permissions.askAsync(Permissions.CONTACTS)
    // TODO: check they get another chance to grant permission if they decline
    if (status === 'granted') {
      const phoneContacts = await listPhoneContacts()
      client.writeQuery({
        query: LIST_PHONE_CONTACTS,
        data: { phoneContacts }
      })
      this.setState({ contactsLoaded: true })
    }
  }

  async loadFonts () {
    await Font.loadAsync({
      [fontRegular.fontFamily]: require('@assets/fonts/Lato/Lato-Regular.ttf'),
      [fontMedium.fontFamily]: require('@assets/fonts/Lato/Lato-Bold.ttf'),
      [fontLight.fontFamily]: require('@assets/fonts/Lato/Lato-Light.ttf')
    })
    this.setState({ fontLoaded: true })
  }

  async loadUser () {
    const user = await getOrCreateUser()
    this.setState({ user: user || 'not authenticated' })
  }

  async onHubCapsule (capsule) {
    if (capsule.payload.event === 'signIn') {
      this.loadUser()
    }
  }

  render () {
    const { fontLoaded, contactsLoaded, user } = this.state
    return fontLoaded && contactsLoaded && user ? (
      <UserContext.Provider value={user}>
        <AppNavigator
          // persistenceKey='persistenceKey005'
          renderLoadingExperimental={() => <Loading />}
        />
      </UserContext.Provider>
    ) : <Loading />
  }
}

const AppWithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <ApolloConsumer>
        {client => <App client={client} />}
      </ApolloConsumer>
    </Rehydrated>
  </ApolloProvider>
)

export default AppWithProvider
