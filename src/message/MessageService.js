import gql from 'graphql-tag'
import * as mutations from '@graphql/mutations'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'
import * as myQueries from '@mygraphql/queries'

// Mutations
export const createMessage = gql(mutations.createMessage)

// Queries
export const getMessage = gql(queries.getMessage)
export const listGroupMessages = gql(myQueries.listGroupMessages)

// Subscriptions
export const onCreateMessage = gql(subscriptions.onCreateMessage)
