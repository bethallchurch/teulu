import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import { getAlbums } from '@albums/AlbumService'

class AlbumList extends Component {
  state = { albums: [] }

  async componentDidMount () {
    try {
      const albums = await getAlbums()
      this.setState({ albums })
    } catch (error) {
      console.log('error getting albums:', error)
    }
  }

  navigateToAlbum = () => this.props.navigation.navigate('Album')

  render () {
    return (
      <View>
        {this.state.albums.map(({ id, name, coverUrl }) => (
          <TouchableOpacity key={id} onPress={this.navigateToAlbum}>
            <ListItem title={`Placeholder for ${name}`} />
          </TouchableOpacity>
        ))}
      </View>
    )
  }

}

export default AlbumList
