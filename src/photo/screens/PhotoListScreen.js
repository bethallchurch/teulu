import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { ScreenBase } from '@global/components'
import PhotoUpload from '@photo/components/PhotoUpload'
import PhotoList, { AlbumPhotoList } from '@photo/components/PhotoList'

class PhotoListScreen extends Component {
  get albumId () {
    return this.props.navigation.getParam('albumId')
  }

  render () {
    return (
      <ScreenBase>
        <View style={styles.container}>
          {this.albumId && (
            <>
              <AlbumPhotoList
                albumId={this.albumId}
                containerPadding={0}
                gutterWidth={0}
                numColumns={2}
                {...this.props}
              />
              <PhotoUpload {...this.props} />
            </>
          )}
          {!this.albumId && (
            <PhotoList
              containerPadding={0}
              gutterWidth={0}
              numColumns={2}
              {...this.props}
            />
          )}
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
