import { createQuery } from '@global/helpers'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'

// Mutations

// Queries
export const getMessage = (id, execute = false) => createQuery(queries.getMessage, { id }, execute)

// Subscriptions
export const onCreateMessage = (params = {}, execute = false) => createQuery(subscriptions.onCreateMessage, params, execute)
