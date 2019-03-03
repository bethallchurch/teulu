import { createQuery } from '@global/helpers'
import { getAuthUser } from '@auth/AuthService'
import * as mutations from '@graphql/mutations'
import * as queries from '@graphql/queries'

// Mutations
const createUser = (input, execute = false) => createQuery(mutations.createUser, { input }, execute)

// Queries
export const getUser = (id, execute = false) => createQuery(queries.getUser, { id }, execute)
export const listUsers = (params = {}, execute = false) => createQuery(queries.listUsers, params, execute)

export const getOrCreateUser = async () => {
  try {
    const authUser = await getAuthUser()
    const check = await getUser(authUser.username, true)
    const { getUser: user } = check.data
    const result = user ? await Promise.resolve(null) : await createUser({
      id: authUser.username,
      phoneNumber: authUser.attributes.phone_number
    }, true)
    return user || result.data.createUser
  } catch (error) {
    console.log('Error creating or getting user:', error)
  }
}
