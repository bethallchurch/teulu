import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Connect, S3Image } from 'aws-amplify-react-native'
import { graphqlOperation } from 'aws-amplify'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'
import Loading from '@global/components/Loading'
import Error from '@global/components/Error'

const PhotoListItem = ({ thumbnail: { height, width, key } }) => (
  <S3Image style={{ width, height }} imgKey={key.replace('public/', '')} />
)

const PhotoList = ({ photos }) => (
  <View>
    {photos.map(photo => (
      <PhotoListItem key={photo.thumbnail.key} {...photo} />
    ))}
  </View>
)

const ConnectedPhotoList = props => {
  const { albumId } = props
  return (
    <Connect
      query={graphqlOperation(queries.listMessages)}
      subscription={graphqlOperation(subscriptions.onCreateMessage)}
      onSubscriptionMsg={(previous, { onCreateMessage }) => {
        return previous
        const belongsToThisAlbum = onCreateMessage.group.id === albumId
        const isTextMessage = onCreateMessage.type === 'TEXT'
        console.log('MESSAGE TYPE:', onCreateMessage.type)
        if (!belongsToThisAlbum || isTextMessage) return previous
        const { listMessages } = previous
        const newItems = [ onCreateMessage, ...listMessages.items ]
        return { ...previous, listMessages: { ...listMessages, items: newItems } }
      }}
     >
      {({ data: { listMessages }, loading, error, errors }) => {
        if (error) return <Error />
        if (loading || !listMessages) return <Loading />

        const albumPhotos = listMessages.items
          .filter(message => !!message)
          .filter(({ album: { id } }) => id === albumId)
          .filter(({ type }) => type === 'PHOTO')

        console.log('PHOTOS!', albumPhotos)
        return <PhotoList photos={albumPhotos} {...props} />
      }}
    </Connect>
  )
}

export default ConnectedPhotoList
