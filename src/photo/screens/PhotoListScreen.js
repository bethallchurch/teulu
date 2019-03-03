import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { ScreenBase } from '@global/components'
import PhotoUpload from '@photo/components/PhotoUpload'
import PhotoList from '@photo/components/PhotoList'

class PhotoListScreen extends Component {
  get albumId () {
    return this.props.navigation.getParam('albumId')
  }

  render () {
    return (
      <ScreenBase>
        <View style={styles.container}>
          <PhotoList albumId={this.albumId} {...this.props} />
          <PhotoUpload {...this.props} />
        </View>
      </ScreenBase>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  }
})

export default PhotoListScreen
