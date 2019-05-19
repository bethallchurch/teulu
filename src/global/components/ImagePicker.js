import React, { Component } from 'react'
import { CameraRoll, ScrollView, View, TouchableOpacity, Dimensions } from 'react-native'
import { Image, Icon, Divider } from 'react-native-elements'
import uuid from 'uuid/v4'
import { MediaLibrary } from 'expo'
import HeaderIcon from '@navigation/components/HeaderIcon'
import { Text, SquareGrid, Button } from '@global/components'
import { colors, layout } from '@global/styles'

const { width: WINDOW_WIDTH } = Dimensions.get('window')

const getDeviceAlbums = async () => {
  const params = { first: 1, mimeTypes: ['image/jpeg'] }
  const getAlbumCover = albumPhotos => albumPhotos.edges[0] ? albumPhotos.edges[0].node : null
  const albums = await MediaLibrary.getAlbumsAsync()
  const albumPromises = albums.map(album => (
    CameraRoll
      .getPhotos({ groupName: album.title, ...params })
      .then(albumPhotos => ({ ...album, cover: getAlbumCover(albumPhotos) }))
  ))
  const albumsWithCovers = await Promise.all(albumPromises)
  return albumsWithCovers.filter(({ cover }) => !!cover).sort((a, b) => b.assetCount - a.assetCount)
}

export default class ImagePicker extends Component {
  state = { deviceAlbums: [], devicePhotos: [], selectedPhotos: [] }

  async componentDidMount () {
    const deviceAlbums = await getDeviceAlbums()
    this.setState({ deviceAlbums })
  }

  getPhotos = async albumName => {
    const params = { groupName: albumName, first: 20, mimeTypes: ['image/jpeg'] }
    const devicePhotoData = await CameraRoll.getPhotos(params)
    this.setState({ devicePhotos: devicePhotoData.edges })
  }

  togglePhoto = photo => {
    const { selectedPhotos } = this.state
    if (selectedPhotos.map(({ node }) => node.image.uri).includes(photo.node.image.uri)) {
      this.setState({
        selectedPhotos: selectedPhotos.filter(({ node }) => node.image.uri !== photo.node.image.uri)
      })
    } else {
      this.setState({
        selectedPhotos: [ ...selectedPhotos, photo ]
      })
    }
  }

  render () {
    const { deviceAlbums, devicePhotos, selectedPhotos } = this.state
    const { pick, close } = this.props
    return (
      <ScrollView>
        {!devicePhotos.length && (
          <HeaderIcon name='close' type='material-community' onPress={close} />
        )}
        {!!devicePhotos.length && (
          <HeaderIcon name='arrow-left' type='material-community' onPress={() => this.setState({ devicePhotos: [] })} />
        )}
        {!!selectedPhotos.length && (
          <>
            <ScrollView horizontal>
              {selectedPhotos.map(({ node = { image: {} } }, index) => {
                return (
                  <Image
                    key={index}
                    resizeMode='cover'
                    source={{ uri: node.image.uri }}
                    style={{ width: 80, height: 80, marginHorizontal: 2, marginVertical: 4 }}
                  />
                )
              })}
            </ScrollView>
            {!devicePhotos.length && <Button containerStyle={{ margin: 4 }} onPress={() => pick(selectedPhotos.map(({ node }) => node.image))}>Add to Album</Button>}
            <Divider style={{ marginTop: 8, marginBottom: 8 }} />
          </>
        )}
        {!devicePhotos.length && (
          <SquareGrid
            containerPadding={4}
            containerWidth={WINDOW_WIDTH}
            gutterWidth={4}
            numColumns={2}
            data={deviceAlbums}
            keyExtractor={({ id }) => id}
            renderItem={({ item: { id, title }, width, margin }) => (
              <TouchableOpacity
                key={id}
                onPress={() => this.getPhotos(title)}
                style={{ ...margin }}
              >
                <View style={{ width, height: width, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.secondary }}>
                  <Text button style={{ color: colors.secondaryBackground }}>{title}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
        {!!devicePhotos.length && (
          <SquareGrid
            containerPadding={4}
            containerWidth={WINDOW_WIDTH}
            gutterWidth={4}
            numColumns={3}
            data={devicePhotos}
            keyExtractor={() => uuid()}
            renderItem={({ item = { node: { image: {} } }, width, margin, index }) => {
              const selected = this.state.selectedPhotos.map(({ node: { image } }) => image.uri).includes(item.node.image.uri)
              return (
                <TouchableOpacity style={{ position: 'relative', width: width, height: width, ...margin }} onPress={() => this.togglePhoto(item)}>
                  {selected && (
                    <View
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        zIndex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon name='check' type='material-community' color={colors.primary} size={layout.s4} />
                    </View>
                  )}
                  <Image
                    resizeMode='cover'
                    source={{ uri: item.node.image.uri }}
                    style={{ width: width, height: width }}
                  />
                </TouchableOpacity>
              )
            }}
          />
        )}
      </ScrollView>
    )
  }
}
