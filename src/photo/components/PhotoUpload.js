import React, { Component } from 'react'
import { SafeAreaView, Image, Modal, TouchableOpacity, Dimensions } from 'react-native'
import { Query } from 'react-apollo'
import { ImagePicker, Permissions } from 'expo'
import { uploadImage } from '@photo/PhotoService'
import { UserContext } from '@global/context'
import { Text, FullWidthButton, Error, Loading } from '@global/components'
import { GET_ALBUM } from '@album/AlbumService'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import { colors, layout } from '@global/styles'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

// TODO: Modal upload wrong on iPhone X
class PhotoUpload extends Component {
  state = {
    pickedImage: null,
    uploadedImage: null,
    uploading: false,
    hasCameraRollPermission: null,
    modalVisible: false
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
    const { albumId, groupId, authUsers, userId } = this.props
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
            <SafeAreaView style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: colors.overlayBackground }}>
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
            </SafeAreaView>
          </TouchableOpacity>
        </Modal>
      </>
    )
  }
}

const AddRightIcon = () => <MaterialIcons name='photo' size={layout.s4} color={colors.primaryBackground} />
const UploadRightIcon = () => <Feather name='upload' size={layout.s4} color={colors.primaryBackground} />

const ConnectedPhotoUpload = props => {
  const albumId = props.navigation.getParam('albumId')
  const dataExtractor = ({ data: { getAlbum }, loading, error }) => ({
    error,
    loading: loading || !getAlbum,
    item: getAlbum
  })
  return (
    <Query query={GET_ALBUM} variables={{ id: albumId }} fetchPolicy='cache-and-network'>
      {data => {
        const { error, loading, item } = dataExtractor(data)
        if (error) return <Error />
        if (loading) return <Loading />
        return <PhotoUpload albumId={item.id} groupId={item.group.id} authUsers={item.group.authUsers} {...props} />
      }}
    </Query>
  )
}

const PhotoUploadWithContext = props => (
  <UserContext.Consumer>
    {user => <ConnectedPhotoUpload userId={user.id} {...props} />}
  </UserContext.Consumer>
)

export default PhotoUploadWithContext
