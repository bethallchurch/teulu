import React from 'react'
import { Connect } from 'aws-amplify-react-native'
import { graphqlOperation } from 'aws-amplify'
import { getAlbum as customGetAlbum } from '@mygraphql/queries'
import { onCreatePhoto, listPhotos } from '@photo/PhotoService'
import PhotoThumbnail from '@photo/components/PhotoThumbnail'
import { Error, Loading, SquareGrid } from '@global/components'

const PhotoList = ({ photos, containerPadding, containerWidth, gutterWidth, numColumns }) => {
  return (
    <SquareGrid
      containerPadding={containerPadding}
      containerWidth={containerWidth}
      gutterWidth={gutterWidth}
      numColumns={numColumns}
      data={photos}
      keyExtractor={({ thumbnail }) => thumbnail.key}
      renderItem={({ item, width, margin }) => (
        <PhotoThumbnail width={width} height={width} margin={margin} {...item} />
      )}
    />
  )
}

const ConnectedPhotoList = ({ query, subscription, onSubscriptionMsg, dataExtractor, ...props }) => (
  <Connect query={query} subscription={subscription} onSubscriptionMsg={onSubscriptionMsg}>
    {data => {
      const { error, loading, items } = dataExtractor(data)
      if (error) return <Error />
      if (loading) return <Loading />
      return <PhotoList photos={items} {...props} />
    }}
  </Connect>
)

export const AlbumPhotoList = props => {
  const { albumId } = props
  const query = graphqlOperation(customGetAlbum, { id: albumId })
  const subscription = onCreatePhoto()
  const onSubscriptionMsg = (previous, { onCreatePhoto }) => {
    const { getAlbum } = previous
    const newItems = [ onCreatePhoto, ...getAlbum.messages.items ]
    return { ...previous, getAlbum: { ...getAlbum, messages: { ...getAlbum.messages, items: newItems } } }
  }
  const dataExtractor = ({ data: { getAlbum }, loading, error }) => ({
    error,
    loading: loading || !getAlbum,
    items: getAlbum ? getAlbum.photos.items : []
  })
  return (
    <ConnectedPhotoList
      query={query}
      subscription={subscription}
      onSubscriptionMsg={onSubscriptionMsg}
      dataExtractor={dataExtractor}
      {...props}
    />
  )
}

const PhotoListAll = props => {
  const queryParams = props.limit ? { limit: props.limit } : {}
  const query = listPhotos(queryParams)
  const subscription = onCreatePhoto()
  const onSubscriptionMsg = (previous, { onCreatePhoto }) => {
    const { listPhotos } = previous
    const newItems = [ onCreatePhoto, ...listPhotos.items ]
    return { ...previous, listPhotos: { ...listPhotos, items: newItems } }
  }
  const dataExtractor = ({ data: { listPhotos }, loading, error }) => ({
    error,
    loading: loading || !listPhotos,
    items: listPhotos ? listPhotos.items : []
  })
  return (
    <ConnectedPhotoList
      query={query}
      subscription={subscription}
      onSubscriptionMsg={onSubscriptionMsg}
      dataExtractor={dataExtractor}
      {...props}
    />
  )
}

export default PhotoListAll
