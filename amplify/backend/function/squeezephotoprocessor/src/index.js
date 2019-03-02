const AWS = require('aws-sdk')
const S3 = new AWS.S3({ signatureVersion: 'v4' })
const DynamoDBDocClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })
const uuid = require('uuid/v4')

/*
Note: Sharp requires native extensions to be installed in a way that is compatible
with Amazon Linux (in order to run successfully in a Lambda execution environment).

If you're not working in Cloud9, you can use a docker image
built to mimic AWS Lamda's execution environment to install the module's native dependencies:
docker run -v "$PWD":/var/task lambci/lambda:build-nodejs8.10 npm install
*/
const Sharp = require('sharp')

// We'll expect these environment variables to be defined when the Lambda function is deployed
const THUMBNAIL_WIDTH = parseInt(process.env.THUMBNAIL_WIDTH || 50)
const THUMBNAIL_HEIGHT = parseInt(process.env.THUMBNAIL_HEIGHT || 50)
const DYNAMODB_PHOTO_TABLE_NAME = process.env.DYNAMODB_PHOTO_TABLE_ARN.split('/')[1]
const DYNAMODB_MESSAGE_TABLE_NAME = process.env.DYNAMODB_MESSAGE_TABLE_ARN.split('/')[1]

const storePhotoInfo = ({ photo, message }) => {
  const photoParams = {
    Item: photo,
    TableName: DYNAMODB_PHOTO_TABLE_NAME
  }

  console.log('MESSAGE!', message)

  const messageParams = {
    Item: message,
    TableName: DYNAMODB_MESSAGE_TABLE_NAME
  }
  return Promise.all([
    DynamoDBDocClient.put(photoParams).promise(),
    DynamoDBDocClient.put(messageParams).promise()
  ])
}

const getMetadata = async (bucketName, key) => {
  const headResult = await S3.headObject({ Bucket: bucketName, Key: key }).promise()
  return headResult.Metadata
}

const thumbnailKey = filename => {
  return `public/resized/${filename}`
}

const fullsizeKey = filename => {
  return `public/${filename}`
}

const makeThumbnail = photo => {
  return Sharp(photo).resize(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT).toBuffer()
}

const resize = async (bucketName, key) => {
  const originalPhoto = (await S3.getObject({ Bucket: bucketName, Key: key }).promise()).Body
  const originalPhotoName = key.replace('uploads/', '')
  const originalPhotoDimensions = await Sharp(originalPhoto).metadata()

  const thumbnail = await makeThumbnail(originalPhoto)

  await Promise.all([
    S3.putObject({
      Body: thumbnail,
      Bucket: bucketName,
      Key: thumbnailKey(originalPhotoName)
    }).promise(),

    S3.copyObject({
      Bucket: bucketName,
      CopySource: bucketName + '/' + key,
      Key: fullsizeKey(originalPhotoName)
    }).promise()
  ])

  await S3.deleteObject({ Bucket: bucketName, Key: key }).promise()

  return {
    photoId: originalPhotoName,

    thumbnail: {
      key: thumbnailKey(originalPhotoName),
      width: THUMBNAIL_WIDTH,
      height: THUMBNAIL_HEIGHT
    },

    fullsize: {
      key: fullsizeKey(originalPhotoName),
      width: originalPhotoDimensions.width,
      height: originalPhotoDimensions.height
    }
  }
}

const processRecord = async record => {
  const bucketName = record.s3.bucket.name
  const key = record.s3.object.key

  if (key.indexOf('uploads') != 0) return

  const metadata = await getMetadata(bucketName, key)
  const sizes = await resize(bucketName, key)
  const photoId = uuid()
  const messageId = uuid()

  console.log('AUTH USERS:', metadata.authusers)
  console.log('TEXT:', metadata.text)

  const sharedParams = {
    owner: metadata.userid,
    authUsers: JSON.parse(metadata.authusers),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  const photo = {
    ...sharedParams,
    id: photoId,
    bucket: bucketName,
    fullsize: sizes.fullsize,
    thumbnail: sizes.thumbnail,
    photoMessageId: messageId
  }

  const message = {
    ...sharedParams,
    id: messageId,
    type: 'PHOTO',
    text: metadata.text,
    messageGroupId: metadata.groupid,
    photos: [ photoId ]
  }

  await storePhotoInfo({ photo, message })
}

exports.handler = async (event, context, callback) => {
  try {
    event.Records.forEach(processRecord)
    callback(null, { status: 'Photo Processed' })
  } catch (err) {
    console.error(err)
    callback(err)
  }
}
