import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, StatusBar } from 'react-native'
import PhotoUpload from '@photo/components/PhotoUpload'
import PhotoList from '@photo/components/PhotoList'
import { colors } from '@global/styles'

class PhotoListScreen extends Component {
  get albumId () {
    return this.props.navigation.getParam('albumId')
  }

  render () {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryBackground }}>
        <StatusBar />
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <PhotoList albumId={this.albumId} {...this.props} />
          <PhotoUpload {...this.props} />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({})

export default PhotoListScreen
