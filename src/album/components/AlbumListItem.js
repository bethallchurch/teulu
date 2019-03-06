import React from 'react'
import { TouchableOpacity, View, Image, StyleSheet, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo'
import { Text } from '@global/components'
import { layout, colors } from '@global/styles'

const AlbumListItem = ({ onPress, width, margin, name }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[ styles.container, { width, height: width, ...margin } ]}>
      <Image
        resizeMode='cover'
        source={require('@assets/img/placeholder.jpg')}
        style={{ width, height: width }}
        PlaceholderContent={<ActivityIndicator color={colors.primary} />}
      />
      <LinearGradient
        colors={['transparent', colors.overlayBackground]}
        style={[ styles.overlay, { width, height: width } ]}
      >
        <Text subtitleTwo color={colors.primaryBackground} style={styles.title}>{name}</Text>
      </LinearGradient>
    </View>
  </TouchableOpacity>
)

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
  }
})

export default AlbumListItem
