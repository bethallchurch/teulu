import { createQuery } from '@global/helpers'
import * as mutations from '@graphql/mutations'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'

// Queries
export const getMessage = id => createQuery(queries.getMessage, { id })

