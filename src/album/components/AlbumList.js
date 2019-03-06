import React, { Component } from 'react'
import { Connect } from 'aws-amplify-react-native'
import { getGroup } from '@group/GroupService'
import { onCreateAlbum, listAlbums } from '@album/AlbumService'
import { ALBUM } from '@navigation/routes'
import { Error, Loading, SquareGrid } from '@global/components'
import AlbumListItem from '@album/components/AlbumListItem'

class AlbumList extends Component {
  navigateToAlbum = (id, name) => {
    const { navigation: { navigate } } = this.props
    navigate(ALBUM, {
      albumId: id,
      albumName: name,
      authUsers: (this.props.albums[0] || {}).authUsers
    })
  }

  renderItem = ({ item: { id, name }, width, margin, index }) => (
    <AlbumListItem
      onPress={() => this.navigateToAlbum(id, name)}
      width={width}
      margin={margin}
      name={name}
    />
  )

  render () {
    const {
      albums,
      numColumns,
      containerStyle,
      containerPadding,
      gutterWidth,
      containerWidth
    } = this.props
    return (
      <SquareGrid
        keyExtractor={({ id }) => id}
        renderItem={this.renderItem}
        data={albums}
        containerStyle={containerStyle}
        containerPadding={containerPadding}
        containerWidth={containerWidth}
        gutterWidth={gutterWidth}
        numColumns={numColumns}
      />
    )
  }
}

const ConnectedAlbumList = ({ query, subscription, onSubscriptionMsg, dataExtractor, ...props }) => (
  <Connect query={query} subscription={subscription} onSubscriptionMsg={onSubscriptionMsg}>
    {data => {
      const { error, loading, items } = dataExtractor(data)
      if (error) return <Error />
      if (loading) return <Loading />
      return <AlbumList albums={items} {...props} />
    }}
  </Connect>
)

export const GroupAlbumList = props => {
  const { groupId } = props
  const query = getGroup(groupId)
  const subscription = onCreateAlbum({ albumGroupId: groupId })
  const onSubscriptionMsg = (previous, { onCreateAlbum }) => {
    const { getGroup } = previous
    const newItems = [ onCreateAlbum, ...getGroup.albums.items ]
    return { ...previous, getGroup: { ...getGroup, albums: { ...getGroup.albums, items: newItems } } }
  }
  const dataExtractor = ({ data: { getGroup }, loading, error }) => ({
    error,
    loading: loading || !getGroup,
    items: getGroup ? getGroup.albums.items : []
  })
  return (
    <ConnectedAlbumList
      query={query}
      subscription={subscription}
      onSubscriptionMsg={onSubscriptionMsg}
      dataExtractor={dataExtractor}
      {...props}
    />
  )
}

const AlbumListAll = props => {
  const queryParams = props.limit ? { limit: props.limit } : {}
  const query = listAlbums(queryParams)
  const subscription = onCreateAlbum()
  const onSubscriptionMsg = (previous, { onCreateAlbum }) => {
    const { listAlbums } = previous
    const newItems = [ onCreateAlbum, ...listAlbums.items ]
    return { ...previous, listAlbums: { ...listAlbums, items: newItems } }
  }
  const dataExtractor = ({ data: { listAlbums }, loading, error }) => ({
    error,
    loading: loading || !listAlbums,
    items: listAlbums ? listAlbums.items : []
  })
  return (
    <ConnectedAlbumList
      query={query}
      subscription={subscription}
      onSubscriptionMsg={onSubscriptionMsg}
      dataExtractor={dataExtractor}
      {...props}
    />
  )
}

export default AlbumListAll
