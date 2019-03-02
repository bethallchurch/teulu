import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Connect, S3Image } from 'aws-amplify-react-native'
import { graphqlOperation } from 'aws-amplify'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'
import { getAlbum as customGetAlbum } from '@customgraphql/queries'
import Loading from '@global/components/Loading'
import Error from '@global/components/Error'

export const PhotoListItem = ({ thumbnail: { height, width, key } }) => (
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
      query={graphqlOperation(customGetAlbum, { id: albumId })}
      subscription={graphqlOperation(subscriptions.onCreatePhoto)}
      onSubscriptionMsg={(previous, { onCreatePhoto }) => {
        const { getAlbum } = previous
        const newItems = [ onCreatePhoto, ...getAlbum.messages.items ]
        return { ...previous, getAlbum: { ...getAlbum, messages: { ...getAlbum.messages, items: newItems }}}
      }}
     >
      {({ data: { getAlbum }, loading, error, errors }) => {
        if (error) return <Error />
        if (loading || !getAlbum) return <Loading />
        return <PhotoList photos={getAlbum.photos.items} {...props} />
      }}
    </Connect>
  )
}

export default ConnectedPhotoList
