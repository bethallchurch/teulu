import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { ImagePicker, Permissions } from 'expo'
import { ScreenBase, Text } from '@global/components'
import PhotoUpload from '@photo/components/PhotoUpload'
import PhotoList, { AlbumPhotoList } from '@photo/components/PhotoList'
import { layout } from '@global/styles'

class PhotoListScreen extends Component {
  state = {
    pickedImage: null,
    uploading: false,
    hasCameraRollPermission: null,
    modalVisible: false,
    error: false
  }

  componentDidMount () {
    this.props.navigation.setParams({ pickImage: this.pickImage })
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
      const pickedImage = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      })
      if (!pickedImage.cancelled) {
        this.setState({ pickedImage, modalVisible: true })
      }
    }
  }

  render () {
    return (
      <ScreenBase>
        <View style={styles.container}>
          {this.albumId && (
            <>
              <View>
                <Text h5 style={styles.title}>{this.albumName}</Text>
                <AlbumPhotoList
                  albumId={this.albumId}
                  containerPadding={0}
                  gutterWidth={0}
                  numColumns={2}
                  {...this.props}
                />
              </View>
              <PhotoUpload
                visible={this.state.modalVisible}
                close={this.closeModal}
                pickedImage={this.state.pickedImage}
                hasCameraRollPermission={this.state.hasCameraRollPermission}
                {...this.props}
              />
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
