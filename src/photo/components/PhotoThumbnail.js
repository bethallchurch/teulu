import React from 'react'
import Lightbox from '@photo/components/Lightbox'
import Image from '@photo/components/Image'

const PhotoThumbnail = ({
  fullsize,
  margin = {},
  index = null,
  width = null,
  height = null,
  swiperImages = [],
  thumbnail: { width: thumbnailWidth, height: thumbnailHeight, key: thumbnailKey }
}) => {
  const activeProps = fullsize => ({
    resizeMode: 'contain',
    imgKey: fullsize.key.replace('public/', ''),
    ...fullsize
  })
  return (
    <Lightbox
      swiperIndex={index}
      activeProps={activeProps(fullsize)}
      swiperImages={swiperImages.map(image => ({ props: activeProps(image.fullsize) }))}
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
