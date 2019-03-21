import React from 'react'
import { TouchableOpacity, View, Image, StyleSheet, ActivityIndicator } from 'react-native'
import { Query } from 'react-apollo'
import { Icon } from 'react-native-elements'
import { GET_PHOTO } from '@photo/PhotoService'
import { Text, Loading, Error } from '@global/components'
import AWSImage from '@photo/components/Image'
import { LinearGradient } from 'expo'
import { fade } from '@global/styles/helpers'
import { layout, colors } from '@global/styles'

const AlbumListItem = ({ onPress, imgKey, width, margin, name, numPhotos, groupName }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[ styles.container, { width, ...margin } ]}>
      <CoverImage imgKey={imgKey} width={width} />
      {groupName && (
        <LinearGradient
          colors={[ fade('#000000', 0.4), 'transparent', 'transparent' ]}
          style={[ styles.overlay, { width, height: layout.r4to3(width) } ]}
        >
          <View style={styles.groupInfoContainer}>
            <Icon name='people' size={layout.s3} color={colors.secondaryBackground} containerStyle={{ marginRight: layout.s1 }} />
            <Text caption color={colors.secondaryBackground}>{groupName}</Text>
          </View>
        </LinearGradient>
      )}
      <Caption name={name} numPhotos={numPhotos} />
    </View>
  </TouchableOpacity>
)

const Caption = ({ name, numPhotos }) => (
  <View style={styles.caption}>
    <Text subtitleTwo color={colors.textDefault} style={styles.captionTitle}>{name}</Text>
    <Text caption color={colors.textLight}>{numPhotos} {numPhotos === 1 ? 'Photo' : 'Photos'}</Text>
  </View>
)

const CoverImage = ({ imgKey, width }) => {
  return imgKey ? (
    <AWSImage
      resizeMode='cover'
      imgKey={imgKey.replace('public/', '')}
      style={{ width, height: layout.r4to3(width) }}
    />
  ) : (
    <Image
      resizeMode='cover'
      source={require('@assets/img/placeholder.jpg')}
      style={{ width, height: layout.r4to3(width) }}
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
  caption: {
    paddingVertical: layout.s1
  },
  captionTitle: {
    marginBottom: layout.s1
  },
  groupInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    padding: layout.s2
  },
  icon: {
    position: 'absolute',
    top: layout.s2,
    right: layout.s2
  }
})

const dataExtractor = ({ data: { getPhoto } = {}, loading, error }) => ({
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
