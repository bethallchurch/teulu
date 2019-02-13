import { API, graphqlOperation } from 'aws-amplify'
import * as mutations from '@graphql/mutations'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'

export const getGroup = id => API.graphql(graphqlOperation(queries.getGroup, { id }))

export const createGroup = input => API.graphql(graphqlOperation(mutations.createGroup, { input }))

export const createGroupLink = input => API.graphql(graphqlOperation(mutations.createGroupLink, { input }))
