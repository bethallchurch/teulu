import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import { listGroupAlbums } from '@albums/AlbumService'

class AlbumList extends Component {
  state = { albums: [] }

  async componentDidMount () {
    const groupId = this.props.navigation.getParam('groupId')
    try {
      const albums = await listGroupAlbums(groupId)
      this.setState({ albums })
    } catch (error) {
      console.log('Error getting albums:', error)
    }
  }

  navigateToAlbum = (id, name) => this.props.navigation.navigate('Album', {
    albumId: id,
    albumName: name
  })

  render () {
    return (
      <View>
        {this.state.albums.map(({ id, name, coverUrl }) => (
          <TouchableOpacity key={id} onPress={() => this.navigateToAlbum(id, name)}>
            <ListItem key={id} title={name} />
          </TouchableOpacity>
        ))}
      </View>
    )
  }

}

export default AlbumList
