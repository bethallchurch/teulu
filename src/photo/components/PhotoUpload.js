import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import { Storage } from 'aws-amplify'
import { Input, Button } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo'
import { Connect, S3Image } from 'aws-amplify-react-native'
import { uploadImage } from '@photos/PhotoService'
import { UserContext } from '@global/context'

class PhotoUpload extends Component {
  state = {
    pickedImage: null,
    uploadedImage: null,
    uploading: false,
    hasCameraRollPermission: null
  }

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    this.setState({ hasCameraRollPermission: status === 'granted' })
    if (status === 'granted') {
      const pickedImage = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      })
      if (!pickedImage.cancelled) {
        this.setState({ pickedImage })
      }
    }
  }

  saveImage = async () => {
    const { pickedImage: { uri } } = this.state
    const albumId = this.props.navigation.getParam('albumId')
    const { userId } = this.props
    try {
      this.setState({ uploading: true })
      const { key } = await uploadImage({ uri, albumId, userId })
      console.log('UPLOADED IMAGE:', key)
      this.setState({ uploadedImage: key })
    } catch (error) {
      console.log('Error uploading image:', error)
    } finally {
      this.setState({ uploading: false })
    }
  }

  render () {
    if (this.state.hasCameraRollPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <View>
          <Button onPress={this.pickImage} title='Choose Image' />
          {this.state.pickedImage && <Button onPress={this.saveImage} title='Upload Image' />}
          {this.state.uploadedImage && <Image style={{ width: 100, height: 100 }} source={{ uri: this.state.uploadedImage }} />}
        </View>
      )
    }
  }
}

const PhotoUploadWithContext = props => (
  <UserContext.Consumer>
    {({ userId }) => <PhotoUpload userId={userId} {...props} />}
  </UserContext.Consumer>
)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  }
})

export default PhotoUploadWithContext
