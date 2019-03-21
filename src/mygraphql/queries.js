export const listContacts = `query ListContacts(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      phoneNumber
      name4 @client
      createdAt
      updatedAt
    }
    nextToken
  }
}`

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
