/* global XMLHttpRequest */
import gql from 'graphql-tag'
import { Storage } from 'aws-amplify'
import { v4 as uuid } from 'uuid'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'
import * as myQueries from '@mygraphql/queries'

// Queries
export const getPhoto = gql(queries.getPhoto)
export const listPhotos = gql(queries.listPhotos)
export const listAlbumPhotos = gql(myQueries.listAlbumPhotos)

// Subscriptions
export const onCreatePhoto = gql(subscriptions.onCreatePhoto)

// Why are we using XMLHttpRequest? See:
// https://github.com/expo/expo/issues/2402#issuecomment-443726662
const getImageBlob = uri => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = () => { resolve(xhr.response) }
    xhr.onerror = error => {
      console.log('Error converting image to blob:', error)
      reject(new TypeError('Network request failed'))
    }
    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)
    xhr.send(null)
  })
}

export const uploadImage = async ({ uri, groupId, authUsers, albumId, userId }) => {
  const blob = await getImageBlob(uri)
  const key = uuid()
  const snapshot = await Storage.put(key, blob, {
    customPrefix: { public: 'uploads/' },
    metadata: { groupId, authUsers, albumId, userId }
  })
  blob.close()
  return snapshot
}
