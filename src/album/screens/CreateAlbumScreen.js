import React from 'react'
import { Text } from 'react-native'
import { getGroup } from '@group/GroupService'
import { createAlbum } from '@album/AlbumService'
import { ALBUM } from '@navigation/routes'
import ComponentWithInputs from '@global/components/ComponentWithInputs'
import MinimalScreenBase from '@global/components/MinimalScreenBase'
import TextInput from '@global/components/TextInput'
import Button from '@global/components/Button'
import { subtitleStyle } from '@global/styles'

class CreateAlbumScreen extends ComponentWithInputs {
  state = { albumName: '', groupId: '', authUsers: [] }

  async componentDidMount () {
    const id = this.props.navigation.getParam('groupId')
    try {
      const result = await getGroup(id)
      this.setState({ groupId: id, authUsers: result.data.getGroup.authUsers })
    } catch (error) {
      console.log('Error getting group:', error)
    }
  }

  createAlbum = async () => {
    const { albumName, groupId, authUsers } = this.state
    try {
      const result = await createAlbum({ name: albumName, albumGroupId: groupId, authUsers })
      const albumId = result.data.createAlbum.id
      this.props.navigation.navigate(ALBUM, { albumId, albumName })
    } catch (error) {
      console.log('Error creating album:', error)
    }
  }

  render () {
    return (
      <MinimalScreenBase>
        <Text style={subtitleStyle.style}>Name your album</Text>
        <TextInput
          placeholder='Album Name'
          value={this.state.albumName}
          returnKeyType='go'
          autoCorrect={false}
          onChangeText={value => this.onChangeText('albumName', value)}
        />
        <Button onPress={this.createAlbum}>Create Album</Button>
      </MinimalScreenBase>
    )
  }
}

export default CreateAlbumScreen
