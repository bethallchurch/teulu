import React from 'react'
import { Query } from 'react-apollo'
import { LIST_PHOTOS, LIST_ALBUM_PHOTOS } from '@photo/PhotoService'
import PhotoThumbnail from '@photo/components/PhotoThumbnail'
import { Error, Loading, SquareGrid } from '@global/components'

const PhotoList = ({
  photos,
  numColumns,
  gutterWidth,
  containerWidth,
  containerPadding
}) => (
  <SquareGrid
    containerPadding={containerPadding}
    containerWidth={containerWidth}
    gutterWidth={gutterWidth}
    numColumns={numColumns}
    data={photos}
    keyExtractor={({ thumbnail }) => thumbnail.key}
    renderItem={({ item, width, margin, index }) => (
      <PhotoThumbnail
        {...item}
        width={width}
        height={width}
        margin={margin}
        galleryData={photos}
        galleryStartIndex={index}
      />
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
  const { albumId } = props
  const dataExtractor = ({ data: { getAlbum } = {}, loading, error }) => ({
    error,
    loading: loading || !getAlbum,
    items: getAlbum ? getAlbum.photos.items : []
  })
  return (
    <ConnectedPhotoList
      query={LIST_ALBUM_PHOTOS}
      variables={{ albumId }}
      dataExtractor={dataExtractor}
      {...props}
    />
  )
}

const PhotoListAll = props => {
  const query = LIST_PHOTOS
  const variables = props.limit ? { limit: props.limit } : {}
  const dataExtractor = ({ data: { listPhotos } = {}, loading, error }) => ({
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
