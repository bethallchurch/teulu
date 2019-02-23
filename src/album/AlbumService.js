import { API, graphqlOperation } from 'aws-amplify'
import * as mutations from '@graphql/mutations'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'

export const createAlbum = input => API.graphql(graphqlOperation(mutations.createAlbum, { input }))
