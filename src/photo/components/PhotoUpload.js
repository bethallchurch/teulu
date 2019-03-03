import React, { Component } from 'react'
import { View, Image, Modal, TouchableOpacity, Dimensions } from 'react-native'
import { ImagePicker, Permissions } from 'expo'
import { uploadImage } from '@photo/PhotoService'
import { UserContext } from '@global/context'
import { Text, FullWidthButton } from '@global/components'
import { getAlbum } from '@album/AlbumService'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import { colors, layout } from '@global/styles'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

class PhotoUpload extends Component {
  state = {
    pickedImage: null,
    uploadedImage: null,
    uploading: false,
    hasCameraRollPermission: null,
    groupId: null,
    modalVisible: false
  }

  async componentDidMount () {
    const albumId = this.props.navigation.getParam('albumId')
    try {
      const album = await getAlbum(albumId)
      this.setState({ groupId: album.data.getAlbum.group.id })
    } catch (error) {
      console.log('Error getting album:', error)
    }
  }

  hideModal = () => {
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

  saveImage = async () => {
    const { pickedImage: { uri } } = this.state
    const albumId = this.props.navigation.getParam('albumId')
    const groupId = this.state.groupId
    const authUsers = this.props.navigation.getParam('authUsers')
    const { userId } = this.props
    try {
      this.setState({ uploading: true })
      const { key } = await uploadImage({ uri, albumId, userId, groupId, authUsers: JSON.stringify(authUsers) })
      console.log('Image successfully uploaded:', key)
      this.setState({ uploadedImage: key, modalVisible: false })
    } catch (error) {
      console.log('Error uploading image:', error)
    } finally {
      this.setState({ uploading: false, modalVisible: false })
    }
  }

  render () {
    const {
      hasCameraRollPermission,
      pickedImage,
      modalVisible
    } = this.state
    if (hasCameraRollPermission === false) {
      return <Text subtitleTwo>No access to camera</Text>
    }
    return (
      <>
        <FullWidthButton
          title='Add Photo'
          onPress={this.pickImage}
          rightIcon={<AddRightIcon />}
        />
        <Modal transparent visible={modalVisible} onRequestClose={this.hideModal}>
          <TouchableOpacity style={{ flex: 1 }} onPress={this.hideModal}>
            <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: colors.overlayBackground }}>
              {pickedImage && (
                <>
                  <Image
                    resizeMode='contain'
                    style={{ width: windowWidth, height: windowHeight - 80 }}
                    source={{ uri: pickedImage.uri }}
                  />
                  <FullWidthButton
                    title='Upload Photo'
                    onPress={this.saveImage}
                    rightIcon={<UploadRightIcon />}
                  />
                </>
              )}
            </View>
          </TouchableOpacity>
        </Modal>
      </>
    )
  }
}

const AddRightIcon = () => <MaterialIcons name='photo' size={layout.s4} color={colors.primaryBackground} />
const UploadRightIcon = () => <Feather name='upload' size={layout.s4} color={colors.primaryBackground} />

const PhotoUploadWithContext = props => (
  <UserContext.Consumer>
    {user => <PhotoUpload userId={user.id} {...props} />}
  </UserContext.Consumer>
)

export default PhotoUploadWithContext
