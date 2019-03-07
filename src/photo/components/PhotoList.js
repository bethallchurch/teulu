import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { onCreatePhoto, listPhotos, listAlbumPhotos } from '@photo/PhotoService'
import PhotoThumbnail from '@photo/components/PhotoThumbnail'
import { Error, Loading, SquareGrid } from '@global/components'

class PhotoList extends Component {
  componentDidMount () {
    this.unsubscribe = this.props.subscribe()
  }

  componentWillUnmount () {
    this.unsubscribe && this.unsubscribe()
  }

  render () {
    const { photos, containerPadding, containerWidth, gutterWidth, numColumns } = this.props
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
}

const ConnectedPhotoList = ({ query, variables, dataExtractor, subscription, ...props }) => (
  <Query query={query} variables={variables} fetchPolicy='cache-and-network'>
    {({ subscribeToMore, ...data }) => {
      const { error, loading, items } = dataExtractor(data)
      if (error) return <Error />
      if (loading) return <Loading />
      return (
        <PhotoList
          subscribe={subscribeToMore(subscription)}
          photos={items}
          {...props}
        />
      )
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
  const subscription = {
    document: onCreatePhoto,
    variables: { photoAlbumId: props.albumId },
    updateQuery: (previous, { subscriptionData }) => {
      if (!subscriptionData.data) return previous
      const newItems = [ subscriptionData.data.onCreatePhoto, ...previous.getAlbum.items ]
      return { ...previous, getAlbum: { ...previous.getAlbum, items: newItems } }
    }
  }
  return (
    <ConnectedPhotoList
      query={query}
      variables={variables}
      dataExtractor={dataExtractor}
      subscription={subscription}
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
  const subscription = {
    document: onCreatePhoto,
    updateQuery: (previous, { onCreatePhoto }) => {
      const { listPhotos } = previous
      const newItems = [ onCreatePhoto, ...listPhotos.items ]
      return { ...previous, listPhotos: { ...listPhotos, items: newItems } }
    }
  }
  return (
    <ConnectedPhotoList
      query={query}
      variables={variables}
      dataExtractor={dataExtractor}
      subscription={subscription}
      {...props}
    />
  )
}

export default PhotoListAll
