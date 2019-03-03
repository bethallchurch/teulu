/* global XMLHttpRequest */
import { Storage } from 'aws-amplify'
import { v4 as uuid } from 'uuid'
import { createQuery } from '@global/helpers'
import * as queries from '@graphql/queries'

// Queries
export const getPhoto = id => createQuery(queries.getPhoto, { id })

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
