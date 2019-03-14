// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateAlbum = `subscription OnCreateAlbum($albumGroupId: ID) {
  onCreateAlbum(albumGroupId: $albumGroupId) {
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
        }
        nextToken
      }
      messages {
        items {
          id
          owner
          authUsers
          type
          text
          messageGroupId
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
        message {
          id
          owner
          authUsers
          type
          text
          messageGroupId
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
`;
export const onCreateMessage = `subscription OnCreateMessage($messageGroupId: ID) {
  onCreateMessage(messageGroupId: $messageGroupId) {
    id
    owner
    authUsers
    type
    text
    messageGroupId
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
        }
        nextToken
      }
      messages {
        items {
          id
          owner
          authUsers
          type
          text
          messageGroupId
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
        message {
          id
          owner
          authUsers
          type
          text
          messageGroupId
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
`;
export const onCreatePhoto = `subscription OnCreatePhoto($photoAlbumId: ID) {
  onCreatePhoto(photoAlbumId: $photoAlbumId) {
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
          }
          nextToken
        }
        messages {
          items {
            id
            owner
            authUsers
            text
            messageGroupId
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
          message {
            id
            owner
            authUsers
            text
            messageGroupId
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
    message {
      id
      owner
      authUsers
      type
      text
      messageGroupId
      group {
        id
        name
        owner
        authUsers
        userLinks {
          items {
            id
          }
          nextToken
        }
        messages {
          items {
            id
            owner
            authUsers
            text
            messageGroupId
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
          message {
            id
            owner
            authUsers
            text
            messageGroupId
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
`;
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
          messages {
            nextToken
          }
          albums {
            nextToken
          }
          createdAt
          updatedAt
        }
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
          messages {
            nextToken
          }
          albums {
            nextToken
          }
          createdAt
          updatedAt
        }
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
          messages {
            nextToken
          }
          albums {
            nextToken
          }
          createdAt
          updatedAt
        }
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const onCreateGroupLink = `subscription OnCreateGroupLink {
  onCreateGroupLink {
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
        }
        nextToken
      }
      messages {
        items {
          id
          owner
          authUsers
          type
          text
          messageGroupId
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
  }
}
`;
export const onUpdateGroupLink = `subscription OnUpdateGroupLink {
  onUpdateGroupLink {
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
        }
        nextToken
      }
      messages {
        items {
          id
          owner
          authUsers
          type
          text
          messageGroupId
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
  }
}
`;
export const onDeleteGroupLink = `subscription OnDeleteGroupLink {
  onDeleteGroupLink {
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
        }
        nextToken
      }
      messages {
        items {
          id
          owner
          authUsers
          type
          text
          messageGroupId
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
  }
}
`;
export const onCreateGroup = `subscription OnCreateGroup {
  onCreateGroup {
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
          messages {
            nextToken
          }
          albums {
            nextToken
          }
          createdAt
          updatedAt
        }
      }
      nextToken
    }
    messages {
      items {
        id
        owner
        authUsers
        type
        text
        messageGroupId
        group {
          id
          name
          owner
          authUsers
          userLinks {
            nextToken
          }
          messages {
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
          messages {
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
`;
export const onUpdateGroup = `subscription OnUpdateGroup {
  onUpdateGroup {
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
          messages {
            nextToken
          }
          albums {
            nextToken
          }
          createdAt
          updatedAt
        }
      }
      nextToken
    }
    messages {
      items {
        id
        owner
        authUsers
        type
        text
        messageGroupId
        group {
          id
          name
          owner
          authUsers
          userLinks {
            nextToken
          }
          messages {
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
          messages {
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
`;
export const onDeleteGroup = `subscription OnDeleteGroup {
  onDeleteGroup {
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
          messages {
            nextToken
          }
          albums {
            nextToken
          }
          createdAt
          updatedAt
        }
      }
      nextToken
    }
    messages {
      items {
        id
        owner
        authUsers
        type
        text
        messageGroupId
        group {
          id
          name
          owner
          authUsers
          userLinks {
            nextToken
          }
          messages {
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
          messages {
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
`;
