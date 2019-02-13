import React, { Component } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import { getAlbum } from '@albums/AlbumService'

class AlbumSettings extends Component {
  state = { name: '', owner: '' }

  async componentDidMount () {
    const id = this.props.navigation.getParam('albumId')
    try {
      const result = await getAlbum(id)
      const { name, owner } = result.data.getAlbum
      this.setState({ name, owner })
    } catch (error) {
      console.log(error)
    }
  }
  
  render () {
    return (
      <SafeAreaView>
        <Card containerStyle={{ paddingHorizontal: 0 }}>
          <ListItem title={this.state.name} leftElement={<Text>Name</Text>} />
          <ListItem title={this.state.owner} leftElement={<Text>Owner</Text>}  />
        </Card>
      </SafeAreaView>
    )
  }
}

export default AlbumSettings
