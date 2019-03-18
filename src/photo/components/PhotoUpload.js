import React, { Component } from 'react'
import { SafeAreaView, Image, Modal, TouchableOpacity, Dimensions } from 'react-native'
import { Query } from 'react-apollo'
import { adopt } from 'react-adopt'
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
    modalVisible: false,
    error: false
  }

  componentWillUnmount () {
    this.timeout && clearTimeout(this.timeout)
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
      this.setState({ uploadedImage: key, uploading: false, modalVisible: false })
    } catch (error) {
      console.log('Error uploading image:', error)
      this.setState({ error: true, uploading: false })
      this.timeout = setTimeout(() => {
        this.setState({ modalVisible: false, error: false })
      }, 1500)
    }
  }

  render () {
    const {
      hasCameraRollPermission,
      pickedImage,
      modalVisible,
      uploading,
      error
    } = this.state
    if (hasCameraRollPermission === false) {
      return <Text subtitleTwo>No access to camera</Text>
    }
    const uploadButtonTitle = error ? 'Error Uploading Photo' : uploading ? 'Uploading...' : 'Upload Photo'
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
                  {uploading && <Text bodyOne style={{ color: '#fff' }}>Image uploading...</Text>}
                  <Image
                    resizeMode='contain'
                    style={{ width: windowWidth, height: windowHeight - 80 }}
                    source={{ uri: pickedImage.uri }}
                  />
                  <FullWidthButton
                    error={error}
                    loading={uploading}
                    title={uploadButtonTitle}
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

const dataExtractor = ({ data: { getAlbum }, loading, error }) => ({
  error,
  loading: loading || !getAlbum,
  album: getAlbum
})

const mapper = {
  user: <UserContext.Consumer />,
  photoData: ({ albumId, render }) => {
    return (
      <Query query={GET_ALBUM} variables={{ id: albumId }}>
        {photoData => render(photoData)}
      </Query>
    )
  }
}

const mapProps = ({ user, photoData }) => {
  const { error, loading, album } = dataExtractor(photoData)
  return { userId: user.id, error, loading, album }
}

const Connect = adopt(mapper, mapProps)

const ConnectedPhotoUpload = props => (
  <Connect albumId={props.navigation.getParam('albumId')}>
    {({ userId, error, loading, album }) => {
      if (error) return <Error />
      if (loading) return <Loading />
      return (
        <PhotoUpload
          userId={userId}
          albumId={album.id}
          groupId={album.group.id}
          authUsers={album.group.authUsers}
          {...props}
        />
      )
    }}
  </Connect>
)

export default ConnectedPhotoUpload
