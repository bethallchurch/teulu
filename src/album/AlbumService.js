import gql from 'graphql-tag'
import * as mutations from '@graphql/mutations'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'

// Mutations
export const createAlbum = gql(mutations.createAlbum)

// Queries
export const getAlbum = gql(queries.getAlbum)
export const listAlbums = gql(queries.listAlbums)

// Subscriptions
export const onCreateAlbum = gql(subscriptions.onCreateAlbum)
