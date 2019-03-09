import gql from 'graphql-tag'
import * as mutations from '@graphql/mutations'
import * as queries from '@graphql/queries'

// Mutations
export const CREATE_ALBUM = gql(mutations.createAlbum)

// Queries
export const GET_ALBUM = gql(queries.getAlbum)
export const LIST_ALBUMS = gql(queries.listAlbums)
