import React, { Component } from 'react'
import { Modal } from 'react-native'
import { Query } from 'react-apollo'
import { adopt } from 'react-adopt'
import { uploadImages } from '@photo/PhotoService'
import { UserContext } from '@global/context'
import { Text, Error, Loading } from '@global/components'
import { GET_ALBUM } from '@album/AlbumService'

class PhotoUpload extends Component {
  state = {
    uploadedImage: null,
    uploading: false,
    error: false
  }

  componentDidMount () {
    this.uploadImages()
  }

  componentWillUnmount () {
    this.timeout && clearTimeout(this.timeout)
  }

  uploadImages = async () => {
    const { albumId, userId, close, pickedImages } = this.props
    const authUsers = JSON.stringify(this.props.authUsers)
    const imagesToUpload = pickedImages.map(({ uri }) => ({ uri, albumId, userId, authUsers }))
    try {
      this.setState({ uploading: true })
      const result = await uploadImages(imagesToUpload)
      console.log('Image successfully uploaded:', result)
      // this.setState({ uploadedImage: key, uploading: false })
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
    const {
      close,
      visible,
      hasCameraRollPermission
    } = this.props
    if (hasCameraRollPermission === false) {
      return <Text subtitleTwo>No access to camera</Text>
    }
    return (
      <Modal visible={visible} onRequestClose={close}>
        <Text>UPLOADING!!!</Text>
      </Modal>
    )
  }
}

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
