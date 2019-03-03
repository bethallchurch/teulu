import { createQuery } from '@global/helpers'
import * as mutations from '@graphql/mutations'
import * as queries from '@graphql/queries'

// Mutations
export const createGroup = input => createQuery(mutations.createGroup, { input })
export const createGroupLink = input => createQuery(mutations.createGroupLink, { input })

// Queries
export const getGroup = id => createQuery(queries.getGroup, { id })
