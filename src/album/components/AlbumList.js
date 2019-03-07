import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { getGroup } from '@group/GroupService'
import { onCreateAlbum, listAlbums } from '@album/AlbumService'
import { ALBUM } from '@navigation/routes'
import { Error, Loading, SquareGrid } from '@global/components'
import AlbumListItem from '@album/components/AlbumListItem'

class AlbumList extends Component {
  componentDidMount () {
    console.log('subscribing...', this.props.subscribe)
    this.unsubscribe = this.props.subscribe()
  }

  componentWillUnmount () {
    this.unsubscribe && this.unsubscribe()
  }

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

const ConnectedAlbumList = ({ query, variables, dataExtractor, subscription, ...props }) => (
  <Query query={query} variables={variables} fetchPolicy='cache-and-network'>
    {({ subscribeToMore, ...data }) => {
      const { error, loading, items } = dataExtractor(data)
      if (error) return <Error />
      if (loading) return <Loading />
      return (
        <AlbumList
          subscribe={subscribeToMore(subscription)}
          albums={items}
          {...props}
        />
      )
    }}
  </Query>
)

export const GroupAlbumList = props => {
  const query = getGroup
  const variables = { id: props.groupId }
  const subscription = {
    document: onCreateAlbum,
    variables: { albumGroupId: props.groupId },
    updateQuery: (previous, { subscriptionData }) => {
      if (!subscriptionData.data) return previous
      const newItems = [ subscriptionData.data.onCreateAlbum, ...listAlbums.items ]
      return { ...previous, listAlbums: { ...listAlbums, items: newItems } }
    }
  }
  const dataExtractor = ({ data: { getGroup }, loading, error }) => ({
    error,
    loading: loading || !getGroup,
    items: getGroup ? getGroup.albums.items : []
  })
  return (
    <ConnectedAlbumList
      query={query}
      variables={variables}
      dataExtractor={dataExtractor}
      subscription={subscription}
      {...props}
    />
  )
}

const AlbumListAll = props => {
  const query = listAlbums
  const variables = props.limit ? { limit: props.limit } : {}
  const dataExtractor = ({ data: { listAlbums }, loading, error }) => ({
    error,
    loading: loading || !listAlbums,
    items: listAlbums ? listAlbums.items : []
  })
  const subscription = {
    document: onCreateAlbum,
    updateQuery: (previous, { subscriptionData }) => {
      console.log('DATA:', subscriptionData)
      if (!subscriptionData.data) return previous
      const newItems = [ subscriptionData.data.onCreateAlbum, ...previous.listAlbums.items ]
      return { ...previous, listAlbums: { ...previous.listAlbums, items: newItems } }
    }
  }
  return (
    <ConnectedAlbumList
      query={query}
      variables={variables}
      dataExtractor={dataExtractor}
      subscription={subscription}
      {...props}
    />
  )
}

export default AlbumListAll
