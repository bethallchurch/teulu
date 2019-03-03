import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Connect } from 'aws-amplify-react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { ScreenBase, Error, Loading, Text } from '@global/components'
import { colors, layout } from '@global/styles'
import { getAlbum } from '@album/AlbumService'

// TODO: Top same as GroupSettingsScreen
const AlbumSettings = ({ album }) => (
  <ScreenBase style={styles.container}>
    <View style={styles.imageContainer}>
      <MaterialIcons name='image' color={colors.primaryBackground} size={layout.s6} />
      <Text h4 color={colors.primaryBackground} style={styles.imageCaption}>{album.name}</Text>
    </View>
  </ScreenBase>
)

const ConnectedAlbumSettings = props => (
  <Connect query={getAlbum(props.navigation.getParam('albumId'))}>
    {({ data: { getAlbum }, loading, error }) => {
      if (error) return <Error />
      if (loading || !getAlbum) return <Loading />
      return <AlbumSettings album={getAlbum} {...props} />
    }}
  </Connect>
)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start'
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: colors.textDefault,
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

export default ConnectedAlbumSettings
