import gql from 'graphql-tag'
import { API, graphqlOperation } from 'aws-amplify'
import { getAuthUser } from '@auth/AuthService'
import * as mutations from '@graphql/mutations'
import * as queries from '@graphql/queries'

// Queries
const getUser = id => API.graphql(graphqlOperation(queries.getUser, { id }))
export const listUsers = ({ filter }) => API.graphql(graphqlOperation(queries.listUsers, { filter }))
export const LIST_USERS = gql(queries.listUsers)

// Mutations
const createUser = input => API.graphql(graphqlOperation(mutations.createUser, { input }))

export const getOrCreateUser = async () => {
  try {
    const authUser = await getAuthUser()
    const check = await getUser(authUser.username)
    const { getUser: user } = check.data
    const result = user ? await Promise.resolve(null) : await createUser({
      id: authUser.username,
      phoneNumber: authUser.attributes.phone_number
    })
    return user || result.data.createUser
  } catch (error) {
    console.log('Error creating or getting user:', error)
  }
}
