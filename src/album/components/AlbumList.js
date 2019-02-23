import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { graphqlOperation }  from 'aws-amplify'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'
import { Connect } from 'aws-amplify-react-native'
import { ListItem } from 'react-native-elements'
import { ALBUM } from '@navigation/routes'

class AlbumList extends Component {
  navigateToAlbum = (id, name) => this.props.navigation.navigate(ALBUM, {
    albumId: id,
    albumName: name
  })

  render () {
    return (
      <View>
        {this.props.albums.map(({ id, name }) => (
          <TouchableOpacity key={id} onPress={() => this.navigateToAlbum(id, name)}>
            <ListItem key={id} title={name} />
          </TouchableOpacity>
        ))}
      </View>
    )
  }

}

const ConnectedAlbumList = props => {
  const groupId = props.navigation.getParam('groupId')
  return (
    <Connect
      query={graphqlOperation(queries.listAlbums)}
      subscription={graphqlOperation(subscriptions.onCreateAlbum)}
      onSubscriptionMsg={(previous, { onCreateAlbum }) => {
        const belongsToThisGroup = onCreateAlbum.group.id === groupId
        if (!belongsToThisGroup) {
          return previous
        }
        const { listAlbums } = previous
        const newItems = [ onCreateAlbum, ...listAlbums.items ]
        return { ...previous, listAlbums: { ...listAlbums, items: newItems } }
      }}
    >
      {({ data: { listAlbums }, loading, error }) => {
        if (error) return <Text>Error</Text>
        if (loading || !listAlbums) return <Text>Loading...</Text>
        const groupAlbums = listAlbums.items.filter(({ group: { id } }) => id === groupId)
        return <AlbumList albums={groupAlbums} {...props} />
      }}
    </Connect>
  )
} 

export default ConnectedAlbumList
