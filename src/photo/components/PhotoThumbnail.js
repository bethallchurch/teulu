import React from 'react'
import { Dimensions } from 'react-native'
import Lightbox from '@photo/components/Lightbox'
import Image from '@photo/components/Image'

const { width: WINDOW_WIDTH } = Dimensions.get('window')

const PhotoThumbnail = ({
  margin = {},
  width = null,
  height = null,
  galleryData = [],
  galleryStartIndex = null,
  fullsize: { key: fullsizeKey },
  thumbnail: { width: thumbnailWidth, height: thumbnailHeight, key: thumbnailKey }
}) => {
  const activeProps = fullsizeKey => ({
    resizeMode: 'contain',
    imgKey: fullsizeKey.replace('public/', ''),
    style: { width: WINDOW_WIDTH, height: '100%' }
  })
  return (
    <Lightbox
      startIndex={galleryStartIndex}
      galleryStartIndex={galleryStartIndex}
      activeProps={activeProps(fullsizeKey)}
      galleryData={galleryData.map(image => activeProps(image.fullsize.key))}
    >
      <Image
        resizeMode='contain'
        imgKey={thumbnailKey.replace('public/', '')}
        style={{ width: width || thumbnailWidth, height: height || thumbnailHeight, ...margin }}
      />
    </Lightbox>
  )
}

export default PhotoThumbnail
