export const listGroupMessages = `query GetGroup($groupId: ID!) {
  getGroup(id: $groupId) {
    id
    name
    owner
    authUsers
    messages {
      items {
        id
        owner
        authUsers
        text
        messageGroupId
        photos {
          items {
            id
            fullsize {
              key
              width
              height
            }
            thumbnail {
              key
              width
              height
            }
          }
        }
        createdAt
        updatedAt
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`

export const listAlbumPhotos = `query GetAlbum($albumId: ID!) {
  getAlbum(id: $albumId) {
    id
    name
    photos {
      items {
        id
        owner
        authUsers
        bucket
        photoAlbumId
        fullsize {
          key
          width
          height
        }
        thumbnail {
          key
          width
          height
        }
        createdAt
        updatedAt
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`
