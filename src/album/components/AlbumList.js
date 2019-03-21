import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { GET_GROUP } from '@group/GroupService'
import { LIST_ALBUMS } from '@album/AlbumService'
import { ALBUM, CREATE_ALBUM } from '@navigation/routes'
import { Error, Loading, SquareGrid } from '@global/components'
import AlbumListItem from '@album/components/AlbumListItem'
import CreateAlbumButton from '@album/components/CreateAlbumButton'

class AlbumList extends Component {
  navigateToCreateAlbum = () => {
    this.props.navigation.navigate(CREATE_ALBUM, {
      groupId: this.props.groupId
    })
  }

  navigateToAlbum = (id, name) => {
    this.props.navigation.navigate(ALBUM, {
      albumId: id,
      albumName: name,
      authUsers: (this.props.albums[0] || {}).authUsers
    })
  }

  renderItem = ({
    index,
    width,
    margin,
    item: { id, name, group, photos: { items = [] } = {} }
  }) => id === 'create-button' ? (
    <CreateAlbumButton onPress={this.navigateToCreateAlbum} width={width} margin={margin} />
  ) : (
    <AlbumListItem
      name={name}
      width={width}
      margin={margin}
      photoId={items.length ? items[0].id : null}
      numPhotos={items.length || 0}
      onPress={() => this.navigateToAlbum(id, name)}
      groupName={!this.props.groupList && group ? group.name : null}
    />
  )

  render () {
    const {
      albums,
      numColumns,
      containerStyle,
      containerPadding,
      gutterWidth,
      containerWidth,
      createButton
    } = this.props

    const data = createButton ? [{ id: 'create-button' }, ...albums] : albums

    return (
      <SquareGrid
        keyExtractor={({ id }) => id}
        renderItem={this.renderItem}
        data={data}
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
  const dataExtractor = ({ data: { getGroup } = {}, loading, error }) => ({
    error,
    loading: loading || !getGroup,
    items: getGroup ? getGroup.albums.items : []
  })
  return (
    <ConnectedAlbumList
      query={GET_GROUP}
      variables={{ id: groupId }}
      dataExtractor={dataExtractor}
      groupList
      {...props}
    />
  )
}

const AlbumListAll = props => {
  const variables = props.limit ? { limit: props.limit } : {}
  const dataExtractor = ({ data: { listAlbums } = {}, loading, error }) => ({
    error,
    loading: loading || !listAlbums,
    items: listAlbums ? listAlbums.items : []
  })
  return (
    <ConnectedAlbumList
      query={LIST_ALBUMS}
      variables={variables}
      dataExtractor={dataExtractor}
      groupList={false}
      {...props}
    />
  )
}

export default AlbumListAll
