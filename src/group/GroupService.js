import { API, graphqlOperation } from 'aws-amplify'
import gql from 'graphql-tag'
import * as mutations from '@graphql/mutations'
import * as queries from '@graphql/queries'

// Mutations
export const CREATE_GROUP = gql(mutations.createGroup)
export const UPDATE_GROUP = gql(mutations.updateGroup)
export const DELETE_GROUP = gql(mutations.deleteGroup)
export const createGroupLink = input => API.graphql(graphqlOperation(mutations.createGroupLink, { input }))
// TODO
export const CREATE_GROUP_LINK = gql(mutations.createGroupLink)
export const DELETE_GROUP_LINK = gql(mutations.deleteGroupLink)

// Queries
export const GET_GROUP = gql(queries.getGroup)
export const LIST_GROUPS = gql(queries.listGroups)
