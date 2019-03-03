import React from 'react'
import { getGroup } from '@group/GroupService'
import { createAlbum } from '@album/AlbumService'
import { ALBUM } from '@navigation/routes'
import { WithInputs, ScreenBase, TextInput, Button, Text } from '@global/components'
import { layout } from '@global/styles'

class CreateAlbumScreen extends WithInputs {
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
      this.props.navigation.navigate(ALBUM, { groupId, authUsers, albumId, albumName })
    } catch (error) {
      console.log('Error creating album:', error)
    }
  }

  render () {
    return (
      <ScreenBase>
        <Text h5 style={{ width: '100%', marginBottom: layout.s2 }}>Name your album</Text>
        <TextInput
          placeholder='Album Name'
          value={this.state.albumName}
          returnKeyType='go'
          autoCorrect={false}
          onChangeText={value => this.onChangeText('albumName', value)}
        />
        <Button onPress={this.createAlbum}>Create Album</Button>
      </ScreenBase>
    )
  }
}

export default CreateAlbumScreen
