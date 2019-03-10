import React from 'react'
import { Dimensions } from 'react-native'
import Lightbox from '@photo/components/Lightbox'
import Image from '@photo/components/Image'

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window')

const PhotoThumbnail = ({
  width = null,
  height = null,
  margin = {},
  fullsize: { key: fullsizeKey },
  thumbnail: { width: thumbnailWidth, height: thumbnailHeight, key: thumbnailKey }
}) => (
  <Lightbox
    activeProps={{
      resizeMode: 'contain',
      imgKey: fullsizeKey.replace('public/', ''),
      style: { width: WINDOW_WIDTH, height: WINDOW_HEIGHT }
    }}>
    <Image
      resizeMode='contain'
      imgKey={thumbnailKey.replace('public/', '')}
      style={{ width: width || thumbnailWidth, height: height || thumbnailHeight, ...margin }}
    />
  </Lightbox>
)

export default PhotoThumbnail
