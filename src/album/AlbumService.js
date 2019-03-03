import { createQuery } from '@global/helpers'
import * as mutations from '@graphql/mutations'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'

// Mutations
export const createAlbum = (input, execute = false) => createQuery(mutations.createAlbum, { input }, execute)

// Queries
export const getAlbum = (id, execute = false) => createQuery(queries.getAlbum, { id }, execute)
export const listAlbums = (params = {}, execute = false) => createQuery(queries.listAlbums, params, execute)

// Subscriptions
export const onCreateAlbum = (params = {}, execute = false) => createQuery(subscriptions.onCreateAlbum, params, execute)
