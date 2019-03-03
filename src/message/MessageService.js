import { createQuery } from '@global/helpers'
import * as queries from '@graphql/queries'

// Queries
export const getMessage = id => createQuery(queries.getMessage, { id })
