import { API, graphqlOperation } from 'aws-amplify'
import gql from 'graphql-tag'
import * as mutations from '@graphql/mutations'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'

// Mutations
export const createGroup = gql(mutations.createGroup)
export const createGroupLink = input => API.graphql(graphqlOperation(mutations.createGroupLink, { input }))

// Queries
export const getGroup = gql(queries.getGroup)
export const listGroups = gql(queries.listGroups)
export const listGroupLinks = gql(queries.listGroupLinks)

// Subscriptions
export const onCreateGroup = gql(subscriptions.onCreateGroup)
