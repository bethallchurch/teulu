import React from 'react'
import { S3Image } from 'aws-amplify-react-native'

const PhotoThumbnail = ({
  width = null,
  height = null,
  thumbnail: { height: photoHeight, width: photoWidth, key }
}) => (
  <S3Image
    style={{ width: width || photoWidth, height: height || photoHeight }}
    imgKey={key.replace('public/', '')}
  />
)

export default PhotoThumbnail
