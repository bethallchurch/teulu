import React, { Component } from 'react'
import { View, Alert, StyleSheet } from 'react-native'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import { LinearGradient } from 'expo'
import { ListItem } from 'react-native-elements'
import { LIST_ALBUMS, GET_ALBUM, DELETE_ALBUM } from '@album/AlbumService'
import { ScreenBase, Error, Loading, Text } from '@global/components'
import { BackgroundImage } from '@photo/components/Image'
import { fade } from '@global/styles/helpers'
import { colors, layout } from '@global/styles'

// TODO: Top same as GroupSettingsScreen
class AlbumSettingsScreen extends Component {
  confirmDelete = () => {
    const { album, deleteAlbum } = this.props
    Alert.alert(
      'Confirm Delete Album',
      `Are you sure you want to delete ${album.name}?`,
      [{
        text: 'Cancel',
        style: 'cancel'
      }, {
        text: 'Delete',
        onPress: () => deleteAlbum({ input: { id: album.id } }),
        style: 'destructive'
      }]
    )
  }

  render () {
    const { album } = this.props
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
        <View style={styles.contentContainer}>
          {!album.group && (
            <ListItem
              title={<Text color={colors.danger} subtitleOne>Delete album</Text>}
              onPress={this.confirmDelete}
              leftIcon={{ name: 'delete-outline', color: colors.danger, type: 'material-community' }}
            />
          )}
        </View>
      </ScreenBase>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start'
  },
  contentContainer: {
    padding: layout.s3
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
  album: getAlbum
})

const mapper = {
  albumData: ({ albumId, render }) => {
    const variables = { id: albumId }
    return (
      <Query query={GET_ALBUM} variables={variables} pollInterval={1000}>
        {({ data }) => render(data)}
      </Query>
    )
  },
  deleteAlbum: ({ render, goBack }) => (
    <Mutation mutation={DELETE_ALBUM}>
      {mutation => render({ mutation, goBack })}
    </Mutation>
  )
}

const mapProps = ({ albumData, deleteAlbum }) => {
  const { error, loading, album } = dataExtractor({ data: albumData })
  return {
    error,
    loading,
    album,
    deleteAlbum: ({ input }) => {
      const { goBack } = deleteAlbum
      const update = async (cache, { data: { deleteAlbum } }) => {
        const query = LIST_ALBUMS
        const data = cache.readQuery({ query })
        data.listAlbums.items = data.listAlbums.items.filter(({ id }) => deleteAlbum.id)
        cache.writeQuery({ query, data })
        goBack(null)
      }
      deleteAlbum.mutation({ variables: { input }, update })
    }
  }
}

const Connect = adopt(mapper, mapProps)

const ConnectedAlbumSettingsScreen = props => {
  const albumId = props.navigation.getParam('albumId')
  return (
    <Connect albumId={albumId} goBack={props.navigation.goBack}>
      {({ error, loading, album, deleteAlbum }) => {
        if (error) return <Error />
        if (loading) return <Loading />
        return <AlbumSettingsScreen album={album} deleteAlbum={deleteAlbum} {...props} />
      }}
    </Connect>
  )
}

export default ConnectedAlbumSettingsScreen
