import { Auth, API, graphqlOperation } from 'aws-amplify'
import * as mutations from '@graphql/mutations'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'

// Mutations

export const createUser = input => API.graphql(graphqlOperation(mutations.createUser, { input }))

export const confirmUser = async cognitoId => {
  const usersData = await API.graphql(graphqlOperation(queries.listUsers))
  const users = usersData.data.listUsers.items
  const user = users.find(u => u.cognitoId === cognitoId)
  if (!user.confirmed) {
    const result = await API.graphql(graphqlOperation(mutations.updateUser, {
      input: { id: user.id, confirmed: true }
    }))
  }
  return user
}

// Queries

export const getAuthUser = () => Auth.currentAuthenticatedUser()

// TODO: filters, etc
export const listUsers = () => API.graphql(graphqlOperation(queries.listUsers))

