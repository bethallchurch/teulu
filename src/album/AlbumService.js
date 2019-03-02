import { createQuery } from '@global/helpers'
import * as mutations from '@graphql/mutations'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'

// Mutations
export const createAlbum = input => createQuery(mutations.createAlbum, { input })

// Queries
export const getAlbum = id => createQuery(queries.getAlbum, { id })

