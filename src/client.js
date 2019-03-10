import { Auth } from 'aws-amplify'
import gql from 'graphql-tag'
import AWSAppSyncClient, { createAppSyncLink } from 'aws-appsync'
import { withClientState } from 'apollo-link-state'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import config from '../aws-exports'
import { LIST_PHONE_CONTACTS } from '@contact/ContactService'

const cache = new InMemoryCache()

// NOTE: changed name to name2 to force resolver result to update.
export const typeDefs = gql`
  extend type User {
    name2: String
  }
`

const resolvers = {
  User: {
    name2 (user, args, { cache }) {
      const { phoneContacts } = cache.readQuery({ query: LIST_PHONE_CONTACTS })
      const { name } = phoneContacts.find(({ phoneNumber }) => phoneNumber === user.phoneNumber)
      return name
    }
  }
}

const stateLink = withClientState({ cache, typeDefs, resolvers })

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

export default new AWSAppSyncClient({}, { link })
