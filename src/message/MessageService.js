import gql from 'graphql-tag'
import * as mutations from '@graphql/mutations'
import * as subscriptions from '@graphql/subscriptions'
import * as myQueries from '@mygraphql/queries'

// Mutations
export const CREATE_MESSAGE = gql(mutations.createMessage)

// Queries
export const LIST_GROUP_MESSAGES = gql(myQueries.listGroupMessages)

// Subscriptions
export const ON_CREATE_MESSAGE = gql(subscriptions.onCreateMessage)
