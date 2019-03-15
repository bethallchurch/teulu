import { API, graphqlOperation } from 'aws-amplify'
import gql from 'graphql-tag'
import * as mutations from '@graphql/mutations'
import * as queries from '@graphql/queries'

// Mutations
export const CREATE_GROUP = gql(mutations.createGroup)
export const createGroupLink = input => API.graphql(graphqlOperation(mutations.createGroupLink, { input }))
export const UPDATE_GROUP = gql(mutations.updateGroup)

// Queries
export const GET_GROUP = gql(queries.getGroup)
export const LIST_GROUPS = gql(queries.listGroups)
