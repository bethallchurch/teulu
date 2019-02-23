import { API, graphqlOperation } from 'aws-amplify'
import { getAuthUser } from '@auth/AuthService'
import * as mutations from '@graphql/mutations'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'

// Mutations
const createUser = input => API.graphql(graphqlOperation(mutations.createUser, { input }))

// Queries
const getUser = id => API.graphql(graphqlOperation(queries.getUser, { id }))

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
      username: authUser.username,
      phoneNumber: authUser.attributes.phone_number
    })
    return user ? user : result.data.createUser
  } catch (error) {
    console.log('Error creating or getting user:', error)
  }
}
