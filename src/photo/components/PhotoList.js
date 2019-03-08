import React from 'react'
import { Query } from 'react-apollo'
import { listPhotos, listAlbumPhotos } from '@photo/PhotoService'
import PhotoThumbnail from '@photo/components/PhotoThumbnail'
import { Error, Loading, SquareGrid } from '@global/components'

const PhotoList = ({ photos, containerPadding, containerWidth, gutterWidth, numColumns }) => (
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

const ConnectedPhotoList = ({ query, variables, dataExtractor, ...props }) => (
  <Query query={query} variables={variables} pollInterval={1000}>
    {result => {
      const { error, loading, items } = dataExtractor(result)
      if (error) return <Error />
      if (loading) return <Loading />
      return <PhotoList photos={items} {...props} />
    }}
  </Query>
)

export const AlbumPhotoList = props => {
  const query = listAlbumPhotos
  const variables = { albumId: props.albumId }
  const dataExtractor = ({ data: { getAlbum }, loading, error }) => ({
    error,
    loading: loading || !getAlbum,
    items: getAlbum ? getAlbum.photos.items : []
  })
  return (
    <ConnectedPhotoList
      query={query}
      variables={variables}
      dataExtractor={dataExtractor}
      {...props}
    />
  )
}

const PhotoListAll = props => {
  const query = listPhotos
  const variables = props.limit ? { limit: props.limit } : {}
  const dataExtractor = ({ data: { listPhotos }, loading, error }) => ({
    error,
    loading: loading || !listPhotos,
    items: listPhotos ? listPhotos.items : []
  })
  return (
    <ConnectedPhotoList
      query={query}
      variables={variables}
      dataExtractor={dataExtractor}
      {...props}
    />
  )
}

export default PhotoListAll
