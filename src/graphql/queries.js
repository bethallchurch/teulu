// eslint-disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    phoneNumber
    groups {
      items {
        id
        user {
          id
          phoneNumber
          groups {
            nextToken
          }
          createdAt
          updatedAt
        }
        group {
          id
          name
          owner
          authUsers
          userLinks {
            nextToken
          }
          albums {
            nextToken
          }
          createdAt
          updatedAt
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
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      phoneNumber
      groups {
        items {
          id
          user {
            id
            phoneNumber
            createdAt
            updatedAt
          }
          group {
            id
            name
            owner
            authUsers
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
    nextToken
  }
}
`
export const getGroupLink = `query GetGroupLink($id: ID!) {
  getGroupLink(id: $id) {
    id
    user {
      id
      phoneNumber
      groups {
        items {
          id
          user {
            id
            phoneNumber
            createdAt
            updatedAt
          }
          group {
            id
            name
            owner
            authUsers
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
    group {
      id
      name
      owner
      authUsers
      userLinks {
        items {
          id
          user {
            id
            phoneNumber
            createdAt
            updatedAt
          }
          group {
            id
            name
            owner
            authUsers
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      albums {
        items {
          id
          name
          owner
          authUsers
          albumGroupId
          group {
            id
            name
            owner
            authUsers
            createdAt
            updatedAt
          }
          photos {
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
`
export const listGroupLinks = `query ListGroupLinks(
  $filter: ModelGroupLinkFilterInput
  $limit: Int
  $nextToken: String
) {
  listGroupLinks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user {
        id
        phoneNumber
        groups {
          items {
            id
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      group {
        id
        name
        owner
        authUsers
        userLinks {
          items {
            id
            createdAt
            updatedAt
          }
          nextToken
        }
        albums {
          items {
            id
            name
            owner
            authUsers
            albumGroupId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    nextToken
  }
}
`
export const getGroup = `query GetGroup($id: ID!) {
  getGroup(id: $id) {
    id
    name
    owner
    authUsers
    userLinks {
      items {
        id
        user {
          id
          phoneNumber
          groups {
            nextToken
          }
          createdAt
          updatedAt
        }
        group {
          id
          name
          owner
          authUsers
          userLinks {
            nextToken
          }
          albums {
            nextToken
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
    albums {
      items {
        id
        name
        owner
        authUsers
        albumGroupId
        group {
          id
          name
          owner
          authUsers
          userLinks {
            nextToken
          }
          albums {
            nextToken
          }
          createdAt
          updatedAt
        }
        photos {
          items {
            id
            owner
            authUsers
            bucket
            photoAlbumId
            createdAt
            updatedAt
          }
          nextToken
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
export const listGroups = `query ListGroups(
  $filter: ModelGroupFilterInput
  $limit: Int
  $nextToken: String
) {
  listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      owner
      authUsers
      userLinks {
        items {
          id
          user {
            id
            phoneNumber
            createdAt
            updatedAt
          }
          group {
            id
            name
            owner
            authUsers
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      albums {
        items {
          id
          name
          owner
          authUsers
          albumGroupId
          group {
            id
            name
            owner
            authUsers
            createdAt
            updatedAt
          }
          photos {
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
    nextToken
  }
}
`
export const getAlbum = `query GetAlbum($id: ID!) {
  getAlbum(id: $id) {
    id
    name
    owner
    authUsers
    albumGroupId
    group {
      id
      name
      owner
      authUsers
      userLinks {
        items {
          id
          user {
            id
            phoneNumber
            createdAt
            updatedAt
          }
          group {
            id
            name
            owner
            authUsers
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      albums {
        items {
          id
          name
          owner
          authUsers
          albumGroupId
          group {
            id
            name
            owner
            authUsers
            createdAt
            updatedAt
          }
          photos {
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
    photos {
      items {
        id
        owner
        authUsers
        bucket
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
        photoAlbumId
        album {
          id
          name
          owner
          authUsers
          albumGroupId
          group {
            id
            name
            owner
            authUsers
            createdAt
            updatedAt
          }
          photos {
            nextToken
          }
          createdAt
          updatedAt
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
export const listAlbums = `query ListAlbums(
  $filter: ModelAlbumFilterInput
  $limit: Int
  $nextToken: String
) {
  listAlbums(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      owner
      authUsers
      albumGroupId
      group {
        id
        name
        owner
        authUsers
        userLinks {
          items {
            id
            createdAt
            updatedAt
          }
          nextToken
        }
        albums {
          items {
            id
            name
            owner
            authUsers
            albumGroupId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      photos {
        items {
          id
          owner
          authUsers
          bucket
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
          photoAlbumId
          album {
            id
            name
            owner
            authUsers
            albumGroupId
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
    nextToken
  }
}
`
export const getPhoto = `query GetPhoto($id: ID!) {
  getPhoto(id: $id) {
    id
    owner
    authUsers
    bucket
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
    photoAlbumId
    album {
      id
      name
      owner
      authUsers
      albumGroupId
      group {
        id
        name
        owner
        authUsers
        userLinks {
          items {
            id
            createdAt
            updatedAt
          }
          nextToken
        }
        albums {
          items {
            id
            name
            owner
            authUsers
            albumGroupId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      photos {
        items {
          id
          owner
          authUsers
          bucket
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
          photoAlbumId
          album {
            id
            name
            owner
            authUsers
            albumGroupId
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
`
export const listPhotos = `query ListPhotos(
  $filter: ModelPhotoFilterInput
  $limit: Int
  $nextToken: String
) {
  listPhotos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      authUsers
      bucket
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
      photoAlbumId
      album {
        id
        name
        owner
        authUsers
        albumGroupId
        group {
          id
          name
          owner
          authUsers
          userLinks {
            nextToken
          }
          albums {
            nextToken
          }
          createdAt
          updatedAt
        }
        photos {
          items {
            id
            owner
            authUsers
            bucket
            photoAlbumId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    nextToken
  }
}
`
