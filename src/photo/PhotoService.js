/* global XMLHttpRequest */
import gql from 'graphql-tag'
import { Storage } from 'aws-amplify'
import { v4 as uuid } from 'uuid'
import * as queries from '@graphql/queries'
import * as myQueries from '@mygraphql/queries'

// Queries
export const GET_PHOTO = gql(queries.getPhoto)
export const LIST_PHOTOS = gql(queries.listPhotos)
export const LIST_ALBUM_PHOTOS = gql(myQueries.listAlbumPhotos)

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

export const uploadImage = async ({ uri, authUsers, albumId, userId }) => {
  const blob = await getImageBlob(uri)
  const key = uuid()
  const snapshot = await Storage.put(key, blob, {
    customPrefix: { public: 'uploads/' },
    metadata: { authUsers, albumId, userId }
  })
  blob.close()
  return snapshot
}
