import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, Dimensions } from 'react-native'
import { graphqlOperation } from 'aws-amplify'
import { LinearGradient } from 'expo'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'
import { Connect } from 'aws-amplify-react-native'
import { Image } from 'react-native-elements'
import { ALBUM } from '@navigation/routes'
import Loading from '@global/components/Loading'
import Error from '@global/components/Error'
import { copyStyle, colors, f5, s2, fade } from '@global/styles'

const PADDING = 16
const GUTTER = 16
const COLUMNS = 2

class AlbumList extends Component {
  navigateToAlbum = (id, name) => this.props.navigation.navigate(ALBUM, {
    albumId: id,
    albumName: name,
    authUsers: (this.props.albums[0] || {}).authUsers
  })

  get imageWidth () {
    const {
      numColumns = COLUMNS,
      gutterWidth = GUTTER,
      containerPadding = PADDING,
      containerWidth = Dimensions.get('window').width
    } = this.props
    const gutterSpace = (numColumns - 1) * gutterWidth
    const paddingSpace = containerPadding * 2
    const spaceToDivide = containerWidth - (gutterSpace + paddingSpace)
    return spaceToDivide / numColumns
  }

  itemMargin = index => {
    const { gutterWidth = GUTTER, numColumns = COLUMNS, albums } = this.props
    const numAlbums = albums.length
    const firstRow = index + 1 <= numColumns
    const lastRow = index > (numAlbums - numColumns) + (numAlbums % numColumns)
    const firstColumn = index === 0 || index % numColumns === 0
    const lastColumn = (index + 1) % numColumns === 0
    return {
      marginTop: firstRow ? 0 : gutterWidth / 2,
      marginRight: lastColumn ? 0 : gutterWidth / 2,
      marginBottom: lastRow ? 0 : gutterWidth / 2,
      marginLeft: firstColumn ? 0 : gutterWidth / 2
    }
  }

  renderItem = ({ item: { id, name }, index }) => {
    return (
      <AlbumItem
        onPress={() => this.navigateToAlbum(id, name)}
        width={this.imageWidth}
        margin={this.itemMargin(index)}
        name={name}
      />
    )
  }

  render () {
    const {
      albums,
      numColumns = COLUMNS,
      containerPadding = PADDING
    } = this.props
    return (
      <FlatList
        style={{ padding: containerPadding }}
        keyExtractor={({ id }) => id}
        numColumns={numColumns}
        data={albums}
        renderItem={this.renderItem}
      />
    )
  }
}

const AlbumItem = ({ onPress, width, margin, name }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ flex: 1, position: 'relative', width, height: width, ...margin }}>
        <Image
          resizeMode='cover'
          source={require('@assets/img/placeholder.jpg')}
          style={{ width, height: width }}
          PlaceholderContent={<ActivityIndicator color={colors.primary} />}
        />
        <LinearGradient
          colors={['transparent', fade('#000000', 0.4)]}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', justifyContent: 'flex-end' }}
        >
          <Text style={{ padding: s2, ...copyStyle.bold, ...f5, color: colors.primaryBackground, width: '100%' }}>{name}</Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  )
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
  const query = graphqlOperation(queries.getGroup, { id: groupId })
  const subscription = graphqlOperation(subscriptions.onCreateAlbum, { albumGroupId: groupId })
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
  console.log('COLS:', props.numColumns)
  const queryParams = props.limit ? { limit: props.limit } : {}
  const query = graphqlOperation(queries.listAlbums, queryParams)
  const subscription = graphqlOperation(subscriptions.onCreateAlbum)
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
