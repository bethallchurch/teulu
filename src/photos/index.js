import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Amplify, { Storage } from 'aws-amplify'
import config from './aws-exports'
import { Input, Button } from 'react-native-elements'
import { ImagePicker } from 'expo'
import { withAuthenticator, S3Image } from 'aws-amplify-react-native'

Amplify.configure(config)



class App extends React.Component {
  state = { pickedImage: null, uploadedImage: null, uploading: false }

  async componentDidMount () {
    console.log('component did mount')
    try {
      const uploadedImage = await Storage.get('1549571792241')
      this.setState({ uploadedImage })
      console.log('UPLOADED IMAGE:', uploadedImage)
    } catch (error) {
      console.log('Error retrieving image:', error)
    }
  }

  pickImage = async () => {
    const pickedImage = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true
    })
    if (!pickedImage.cancelled) {
      this.setState({ pickedImage })
    }
  }

  saveImage = async () => {
    const { pickedImage } = this.state
    try {
      this.setState({ uploading: true })
      const key = await uploadImage(pickedImage.uri)
      this.setState({ uploadedImage })
    } catch (error) {
      console.log('Error uploading image:', error)
    } finally {
      this.setState({ uploading: false });
    }
  }
  
  render () {
    return (
      <View>
        <Button onPress={this.pickImage} title='Choose Image' />
        {this.state.pickedImage && <Button onPress={this.saveImage} title='Upload Image' />}
        {this.state.uploadedImage && <Image style={{ width: 100, height: 100 }} source={{ uri: this.state.uploadedImage }} />}
      </View>
    )
  }
}

async function uploadImage (uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  // TODO: generate based on user id and current time
  const key = new Date().getTime().toString()
  const snapshot = await Storage.put(key, blob, {
    contentType: 'image/jpeg'
  });

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.key;
}

const styles = StyleSheet.create({})

export default withAuthenticator(App, { includeGreetings: true })
