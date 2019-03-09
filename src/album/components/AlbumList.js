import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { GET_GROUP } from '@group/GroupService'
import { LIST_ALBUMS } from '@album/AlbumService'
import { ALBUM } from '@navigation/routes'
import { Error, Loading, SquareGrid } from '@global/components'
import AlbumListItem from '@album/components/AlbumListItem'

class AlbumList extends Component {
  navigateToAlbum = (id, name) => {
    this.props.navigation.navigate(ALBUM, {
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

const ConnectedAlbumList = ({ query, variables, dataExtractor, ...props }) => (
  <Query query={query} variables={variables} pollInterval={1000}>
    {data => {
      const { error, loading, items } = dataExtractor(data)
      if (error) return <Error />
      if (loading) return <Loading />
      return <AlbumList albums={items} {...props} />
    }}
  </Query>
)

export const GroupAlbumList = props => {
  const { groupId } = props
  const dataExtractor = ({ data: { getGroup }, loading, error }) => ({
    error,
    loading: loading || !getGroup,
    items: getGroup ? getGroup.albums.items : []
  })
  return (
    <ConnectedAlbumList
      query={GET_GROUP}
      variables={{ id: groupId }}
      dataExtractor={dataExtractor}
      {...props}
    />
  )
}

const AlbumListAll = props => {
  const variables = props.limit ? { limit: props.limit } : {}
  const dataExtractor = ({ data: { listAlbums }, loading, error }) => ({
    error,
    loading: loading || !listAlbums,
    items: listAlbums ? listAlbums.items : []
  })
  return (
    <ConnectedAlbumList
      query={LIST_ALBUMS}
      variables={variables}
      dataExtractor={dataExtractor}
      {...props}
    />
  )
}

export default AlbumListAll
