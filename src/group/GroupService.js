import { createQuery } from '@global/helpers'
import * as mutations from '@graphql/mutations'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'

// Mutations
export const createGroup = (input, execute = false) => createQuery(mutations.createGroup, { input }, execute)
export const createGroupLink = (input, execute = false) => createQuery(mutations.createGroupLink, { input }, execute)

// Queries
export const getGroup = (id, execute = false) => createQuery(queries.getGroup, { id }, execute)
export const listGroups = (params = {}, execute = false) => createQuery(queries.listGroups, params, execute)

// Subscriptions
export const onCreateGroup = (params = {}, execute = false) => createQuery(subscriptions.onCreateGroup, params, execute)
