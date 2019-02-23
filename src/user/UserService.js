import { API, graphqlOperation } from 'aws-amplify'
import { getAuthUser } from '@auth/AuthService'
import * as mutations from '@graphql/mutations'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'

const createQuery = (query, input) => API.graphql(graphqlOperation(query, input))

// Mutations
const createUser = input => createQuery(mutations.createUser, { input })
const updateUser = input => createQuery(mutations.updateUser, { input })

// Queries
const getUser = id => createQuery(queries.getUser, { id })

export const listUsers = async () => {
  const result = await API.graphql(graphqlOperation(queries.listUsers))
  return result.data.listUsers.items
}

export const getOrCreateUser = async () => {
  try {
    const authUser = await getAuthUser()
    const check = await getUser(authUser.username)
    const { getUser: user } = check.data
    const result = user ? await Promise.resolve(null) : await createUser({
      id: authUser.username,
      phoneNumber: authUser.attributes.phone_number
    })
    return user ? user : result.data.createUser
  } catch (error) {
    console.log('Error creating or getting user:', error)
  }
}
