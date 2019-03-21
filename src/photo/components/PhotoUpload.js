import React, { Component } from 'react'
import { SafeAreaView, Image, Modal, TouchableOpacity, Dimensions } from 'react-native'
import { Query } from 'react-apollo'
import { adopt } from 'react-adopt'
import { uploadImage } from '@photo/PhotoService'
import { UserContext } from '@global/context'
import { Text, FullWidthButton, Error, Loading } from '@global/components'
import { GET_ALBUM } from '@album/AlbumService'
import { Feather } from '@expo/vector-icons'
import { colors, layout } from '@global/styles'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

// TODO: Modal upload wrong on iPhone X
class PhotoUpload extends Component {
  state = {
    uploadedImage: null,
    uploading: false,
    error: false
  }

  componentWillUnmount () {
    this.timeout && clearTimeout(this.timeout)
  }

  uploadImage = async () => {
    const { albumId, authUsers, userId, close, pickedImage: { uri } } = this.props
    try {
      this.setState({ uploading: true })
      const { key } = await uploadImage({ uri, albumId, userId, authUsers: JSON.stringify(authUsers) })
      console.log('Image successfully uploaded:', key)
      this.setState({ uploadedImage: key, uploading: false })
      close()
    } catch (error) {
      console.log('Error uploading image:', error)
      this.setState({ error: true, uploading: false })
      this.timeout = setTimeout(() => {
        this.setState({ error: false })
        close()
      }, 1500)
    }
  }

  render () {
    const { uploading, error } = this.state
    const {
      close,
      visible,
      pickedImage,
      hasCameraRollPermission
    } = this.props
    if (hasCameraRollPermission === false) {
      return <Text subtitleTwo>No access to camera</Text>
    }
    const uploadButtonTitle = error ? 'Error Uploading Photo' : uploading ? 'Uploading...' : 'Upload Photo'
    return (
      <Modal transparent visible={visible} onRequestClose={close}>
        <TouchableOpacity style={{ flex: 1 }} onPress={close}>
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
                  onPress={this.uploadImage}
                  rightIcon={<UploadRightIcon />}
                />
              </>
            )}
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>
    )
  }
}

const UploadRightIcon = () => <Feather name='upload' size={layout.s4} color={colors.primaryBackground} />

const dataExtractor = ({ data: { getAlbum } = {}, loading, error }) => ({
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
          authUsers={album.authUsers}
          {...props}
        />
      )
    }}
  </Connect>
)

export default ConnectedPhotoUpload
