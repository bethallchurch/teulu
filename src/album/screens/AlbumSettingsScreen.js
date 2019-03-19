import React from 'react'
import { StyleSheet } from 'react-native'
import { Query } from 'react-apollo'
import { LinearGradient } from 'expo'
import { GET_ALBUM } from '@album/AlbumService'
import { ScreenBase, Error, Loading, Text } from '@global/components'
import { BackgroundImage } from '@photo/components/Image'
import { fade } from '@global/styles/helpers'
import { colors, layout } from '@global/styles'

// TODO: Top same as GroupSettingsScreen
const AlbumSettingsScreen = ({ album }) => {
  const photo = album.photos.items[0]
  const imgKey = photo ? photo.fullsize.key.replace('public/', '') : ''
  return (
    <ScreenBase style={styles.container}>
      <BackgroundImage imgKey={imgKey} resizeMode='cover' style={styles.imageContainer}>
        <LinearGradient
          colors={['transparent', fade('#000000', 0.4)]}
          style={styles.overlay}
        >
          <Text h4 color={colors.primaryBackground} style={styles.imageCaption}>{album.name}</Text>
        </LinearGradient>
      </BackgroundImage>
    </ScreenBase>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start'
  },
  overlay: {
    width: '100%',
    height: 200
  },
  imageContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  imageCaption: {
    position: 'absolute',
    bottom: layout.s3,
    left: layout.s3,
    marginBottom: 0
  }
})

const dataExtractor = ({ data: { getAlbum } = {}, loading, error }) => ({
  error,
  loading: loading || !getAlbum,
  item: getAlbum
})

const ConnectedAlbumSettingsScreen = props => {
  const albumId = props.navigation.getParam('albumId')
  return (
    <Query query={GET_ALBUM} variables={{ id: albumId }} pollInterval={1000}>
      {data => {
        const { error, loading, item } = dataExtractor(data)
        if (error) return <Error />
        if (loading) return <Loading />
        return <AlbumSettingsScreen album={item} {...props} />
      }}
    </Query>
  )
}

export default ConnectedAlbumSettingsScreen
