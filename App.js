import React, { Component } from 'react'
import Amplify, { Hub, Auth } from 'aws-amplify'
import gql from 'graphql-tag'
import AWSAppSyncClient, { createAppSyncLink } from 'aws-appsync'
import { ApolloProvider, ApolloConsumer } from 'react-apollo'
import { withClientState } from 'apollo-link-state'
import { ApolloLink } from 'apollo-link'
import { Rehydrated } from 'aws-appsync-react'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createAppContainer } from 'react-navigation'
import { Font } from 'expo'
import config from './aws-exports'
import AuthStack from '@auth/AuthNavigation'
import { getOrCreateUser } from '@user/UserService'
import { fontRegular, fontLight, fontMedium } from '@global/styles/typography'
import { UserContext } from '@global/context'
import { Loading } from '@global/components'
import { LIST_PHONE_CONTACTS, listPhoneContacts } from '@contact/ContactService'

export const typeDefs = gql`
  extend type User {
    name: String
  }
`

Amplify.configure(config)

export const cache = new InMemoryCache()

const stateLink = withClientState({
  cache,
  typeDefs,
  resolvers: {
    User: {
      name (...args) {
        // TODO: works with query component but not client.query
        console.log('ARGS!', args)
        // cache.readQuery({ query: LIST_PHONE_CONTACTS })
        return 'Test Name'
      }
    }
  }
})

const appSyncLink = createAppSyncLink({
  url: config.aws_appsync_graphqlEndpoint,
  region: config.aws_appsync_region,
  complexObjectsCredentials: () => Auth.currentCredentials(),
  auth: {
    type: config.aws_appsync_authenticationType,
    credentials: () => Auth.currentCredentials(),
    jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken()
  },
  disableOffline: true
})

const link = ApolloLink.from([ stateLink, appSyncLink ])
const client = new AWSAppSyncClient({}, { link })

const AppNavigator = createAppContainer(AuthStack)

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { fontLoaded: false, user: null }
    Hub.listen('auth', this)
  }

  async componentDidMount () {
    this.setUser()
    // TODO: { status } = await Permissions.askAsync(Permissions.CONTACTS)
    const phoneContacts = await listPhoneContacts()
    client.writeQuery({
      query: LIST_PHONE_CONTACTS,
      data: { phoneContacts }
    })
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
