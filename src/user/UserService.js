import gql from 'graphql-tag'
import { API, graphqlOperation } from 'aws-amplify'
import { getAuthUser } from '@auth/AuthService'
import * as mutations from '@graphql/mutations'
import * as queries from '@graphql/queries'

// Queries
export const getUser = gql(queries.getUser)
export const listUsers = gql(queries.listUsers)

export const getOrCreateUser = async () => {
  try {
    const authUser = await getAuthUser()
    const check = await API.graphql(graphqlOperation(queries.getUser, { id: authUser.username }))
    const { getUser: user } = check.data
    const result = user ? await Promise.resolve(null) : await API.graphql(
      graphqlOperation(mutations.createUser, {
        id: authUser.username,
        phoneNumber: authUser.attributes.phone_number
      })
    )
    return user || result.data.createUser
  } catch (error) {
    console.log('Error creating or getting user:', error)
  }
}
