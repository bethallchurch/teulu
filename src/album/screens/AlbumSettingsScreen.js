import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Query } from 'react-apollo'
import { MaterialIcons } from '@expo/vector-icons'
import { ScreenBase, Error, Loading, Text } from '@global/components'
import { colors, layout } from '@global/styles'
import { GET_ALBUM } from '@album/AlbumService'

// TODO: Top same as GroupSettingsScreen
const AlbumSettingsScreen = ({ album }) => (
  <ScreenBase style={styles.container}>
    <View style={styles.imageContainer}>
      <MaterialIcons name='image' color={colors.primaryBackground} size={layout.s6} />
      <Text h4 color={colors.primaryBackground} style={styles.imageCaption}>{album.name}</Text>
    </View>
  </ScreenBase>
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

const dataExtractor = ({ data: { getAlbum }, loading, error }) => ({
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
