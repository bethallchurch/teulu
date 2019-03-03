import React from 'react'
import { FlatList, Dimensions } from 'react-native'
import { Connect } from 'aws-amplify-react-native'
import { graphqlOperation } from 'aws-amplify'
import * as subscriptions from '@graphql/subscriptions'
import { getAlbum as customGetAlbum } from '@mygraphql/queries'
import PhotoThumbnail from '@photo/components/PhotoThumbnail'
import Loading from '@global/components/Loading'
import Error from '@global/components/Error'

const PhotoList = ({ photos }) => {
  const photoWidth = Dimensions.get('window').width / 2
  return (
    <FlatList
      numColumns={2}
      data={photos}
      keyExtractor={({ thumbnail }) => thumbnail.key}
      renderItem={({ item }) => <PhotoThumbnail width={photoWidth} height={photoWidth} {...item} />}
    />
  )
}

const ConnectedPhotoList = props => {
  const { albumId } = props
  return (
    <Connect
      query={graphqlOperation(customGetAlbum, { id: albumId })}
      subscription={graphqlOperation(subscriptions.onCreatePhoto)}
      onSubscriptionMsg={(previous, { onCreatePhoto }) => {
        const { getAlbum } = previous
        const newItems = [ onCreatePhoto, ...getAlbum.messages.items ]
        return { ...previous, getAlbum: { ...getAlbum, messages: { ...getAlbum.messages, items: newItems } } }
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
