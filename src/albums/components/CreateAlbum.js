import React, { Component, Fragment } from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { getGroup } from '@groups/GroupService'
import { createAlbum } from '@albums/AlbumService'

class CreateAlbum extends Component {
  state = { albumName: '', groupId: '', contributors: [] }

  async componentDidMount () {
    const id = this.props.navigation.getParam('groupId')
    try {
      const result = await getGroup(id)
      this.setState({ groupId: id, contributors: result.data.getGroup.members })
    } catch (error) {
      console.log('Error getting group', error)
    }
  }

  updateAlbumName = text => {
    this.setState({ albumName: text })
  }

  createAlbum = async () => {
    const { albumName, groupId, contributors } = this.state
    try {
      const result = await createAlbum({ name: albumName, albumGroupId: groupId, contributors })
      const albumId = result.data.createAlbum.id
      this.props.navigation.navigate('Album', { albumId, albumName })
    } catch (error) {
      console.log('Error creating album:', error)
    }
  }

  render () {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text>Name your album</Text>
          <Input onChangeText={this.updateAlbumName} />
          <Button
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            onPress={this.createAlbum}
            title='Create'
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  buttonContainer: {
    marginTop: 15
  },
  button: {
    backgroundColor: '#000'
  }
})

export default CreateAlbum
