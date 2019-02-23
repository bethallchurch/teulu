import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import PhotoUpload from '@photos/components/PhotoUpload'
import PhotoList from '@photos/components/PhotoList'

class PhotosScreen extends Component {
  get albumId () {
    return this.props.navigation.getParam('albumId')
  }

  render () {
    return (
      <SafeAreaView>
        <PhotoUpload {...this.props} />
        <PhotoList albumId={this.albumId} {...this.props} />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({})

export default PhotosScreen
