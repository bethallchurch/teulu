import React from 'react'
import { TouchableOpacity, View, Image, StyleSheet, ActivityIndicator } from 'react-native'
import { Query } from 'react-apollo'
import { LinearGradient } from 'expo'
import { MaterialIcons } from '@expo/vector-icons'
import { GET_PHOTO } from '@photo/PhotoService'
import { Text, Loading, Error } from '@global/components'
import AWSImage from '@photo/components/Image'
import { fade } from '@global/styles/helpers'
import { layout, colors } from '@global/styles'

const AlbumListItem = ({ onPress, imgKey, width, margin, name, shared }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[ styles.container, { width, height: width, ...margin } ]}>
      <CoverImage imgKey={imgKey} width={width} />
      <LinearGradient
        colors={[fade('#000000', 0.4), 'transparent', fade('#000000', 0.4)]}
        style={[ styles.overlay, { width, height: width } ]}
      >
        {!shared && <MaterialIcons name='lock' color={colors.primaryBackground} style={styles.icon} />}
        <Text subtitleTwo color={colors.primaryBackground} style={styles.title}>{name}</Text>
      </LinearGradient>
    </View>
  </TouchableOpacity>
)

const CoverImage = ({ imgKey, width }) => {
  return imgKey ? (
    <AWSImage
      resizeMode='cover'
      imgKey={imgKey.replace('public/', '')}
      style={{ width, height: width }}
    />
  ) : (
    <Image
      resizeMode='cover'
      source={require('@assets/img/placeholder.jpg')}
      style={{ width, height: width }}
      PlaceholderContent={<ActivityIndicator color={colors.primary} />}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  title: {
    padding: layout.s2,
    width: '100%'
  },
  icon: {
    position: 'absolute',
    top: layout.s2,
    right: layout.s2
  }
})

const dataExtractor = ({ data: { getPhoto }, loading, error }) => ({
  error,
  loading: loading || !getPhoto,
  photo: getPhoto
})

const ConnectedAlbumListItem = props => {
  if (props.photoId) {
    return (
      <Query query={GET_PHOTO} variables={{ id: props.photoId }}>
        {data => {
          const { error, loading, photo } = dataExtractor(data)
          if (error) return <Error />
          if (loading) return <Loading />
          return <AlbumListItem imgKey={photo.thumbnail.key} {...props} />
        }}
      </Query>
    )
  }
  return <AlbumListItem imgKey={null} {...props} />
}

export default ConnectedAlbumListItem
