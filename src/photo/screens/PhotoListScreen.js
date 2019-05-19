import React, { Component } from 'react'
import { View, ScrollView, StyleSheet, Modal } from 'react-native'
import { ImagePicker as ExpoImagePicker, Permissions } from 'expo'
import { ScreenBase, Text } from '@global/components'
import PhotoUpload from '@photo/components/PhotoUpload'
import PhotoList, { AlbumPhotoList } from '@photo/components/PhotoList'
import ImagePicker from '@global/components/ImagePicker'
import { layout } from '@global/styles'

class PhotoListScreen extends Component {
  state = {
    pickedImages: [],
    uploading: false,
    hasCameraRollPermission: null,
    modalVisible: false,
    error: false
  }

  componentDidMount () {
    this.props.navigation.setParams({ pickImage: () => this.setState({ modalVisible: true }) })
  }

  get albumId () {
    return this.props.navigation.getParam('albumId')
  }

  get albumName () {
    return this.props.navigation.getParam('albumName')
  }

  closeModal = () => {
    this.setState({ modalVisible: false })
  }

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    this.setState({ hasCameraRollPermission: status === 'granted' })
    if (status === 'granted') {
      const pickedImage = await ExpoImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      })
      if (!pickedImage.cancelled) {
        this.setState({ pickedImage, modalVisible: true })
      }
    }
  }

pickImages = images => {
  this.setState({ pickedImages: images, modalVisible: false })
}

render () {
  const { pickedImages } = this.state
  return (
    <ScreenBase>
      <View style={styles.container}>
        {this.albumId && (
            <>
              <ScrollView>
                <Text h5 style={styles.title}>{this.albumName}</Text>
                <AlbumPhotoList
                  albumId={this.albumId}
                  containerPadding={0}
                  gutterWidth={0}
                  numColumns={2}
                  {...this.props}
                />
              </ScrollView>
              <Modal
                onRequestClose={this.closeModal}
                visible={this.state.modalVisible}
              >
                <ImagePicker close={this.closeModal} pick={this.pickImages} />
              </Modal>
              {!!pickedImages.length && (
                <PhotoUpload
                  visible={!!pickedImages.length}
                  pickedImages={pickedImages}
                  close={() => this.setState({ pickedImages: [] })}
                  hasCameraRollPermission={this.state.hasCameraRollPermission}
                  {...this.props}
                />
              )}
            </>
        )}
        {!this.albumId && (
          <PhotoList
            containerPadding={0}
            gutterWidth={0}
            numColumns={2}
            {...this.props}
          />
        )}
      </View>
    </ScreenBase>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  title: {
    width: '100%',
    margin: layout.s4,
    marginBottom: layout.s6
  }
})

export default PhotoListScreen
