import { API, graphqlOperation } from 'aws-amplify'
import * as mutations from '@graphql/mutations'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'

export const getAlbum = id => API.graphql(graphqlOperation(queries.getAlbum, { id }))

export const listAlbums = async () => {
  const result = await API.graphql(graphqlOperation(queries.listAlbums))
  return result.data.listAlbums.items
}

export const listGroupAlbums = async groupId => {
  const albums = await listAlbums()
  return albums.filter(({ group: { id } }) => id === groupId)
}

export const createAlbum = input => API.graphql(graphqlOperation(mutations.createAlbum, { input }))
