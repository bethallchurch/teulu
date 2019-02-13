import { Auth, API, graphqlOperation } from 'aws-amplify'
import * as mutations from '@graphql/mutations'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'

// Mutations
export const createUser = input => API.graphql(graphqlOperation(mutations.createUser, { input }))

// Queries
export const getAuthUser = () => Auth.currentAuthenticatedUser()
export const checkUserExists = id => API.graphql(graphqlOperation(queries.getUser, { id }))
// TODO: filters, etc
export const listUsers = async () => {
  const result = await API.graphql(graphqlOperation(queries.listUsers))
  return result.data.listUsers.items
}

export const userInit = async () => {
  try {
    const authUser = await getAuthUser()
    const check = await checkUserExists(authUser.username)
    const { getUser } = check.data
    const result = getUser ? await Promise.resolve(check) : await createUser({
      username: authUser.username,
      phoneNumber: authUser.attributes.phone_number
    })
    return getUser ? result.data.getUser : result.data.createUser
  } catch (error) {
    console.log('Error creating or getting user:', error)
  }
}
