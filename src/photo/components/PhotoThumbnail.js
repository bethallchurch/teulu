import React from 'react'
import { S3Image } from 'aws-amplify-react-native'

const PhotoThumbnail = ({
  width = null,
  height = null,
  margin = {},
  thumbnail: { height: photoHeight, width: photoWidth, key }
}) => (
  <S3Image
    style={{ width: width || photoWidth, height: height || photoHeight, ...margin }}
    imgKey={key.replace('public/', '')}
  />
)

export default PhotoThumbnail
