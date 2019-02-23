// eslint-disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    phoneNumber
    groups {
      items {
        id
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    phoneNumber
    groups {
      items {
        id
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    phoneNumber
    groups {
      items {
        id
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const createGroupLink = `mutation CreateGroupLink($input: CreateGroupLinkInput!) {
  createGroupLink(input: $input) {
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
  }
}
`;
export const updateGroupLink = `mutation UpdateGroupLink($input: UpdateGroupLinkInput!) {
  updateGroupLink(input: $input) {
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
  }
}
`;
export const deleteGroupLink = `mutation DeleteGroupLink($input: DeleteGroupLinkInput!) {
  deleteGroupLink(input: $input) {
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
  }
}
`;
export const createGroup = `mutation CreateGroup($input: CreateGroupInput!) {
  createGroup(input: $input) {
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
    albums {
      items {
        id
        name
        owner
        authUsers
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
export const updateGroup = `mutation UpdateGroup($input: UpdateGroupInput!) {
  updateGroup(input: $input) {
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
    albums {
      items {
        id
        name
        owner
        authUsers
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
export const deleteGroup = `mutation DeleteGroup($input: DeleteGroupInput!) {
  deleteGroup(input: $input) {
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
    albums {
      items {
        id
        name
        owner
        authUsers
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
export const createAlbum = `mutation CreateAlbum($input: CreateAlbumInput!) {
  createAlbum(input: $input) {
    id
    name
    owner
    authUsers
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
    messages {
      items {
        id
        owner
        authUsers
        text
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
export const updateAlbum = `mutation UpdateAlbum($input: UpdateAlbumInput!) {
  updateAlbum(input: $input) {
    id
    name
    owner
    authUsers
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
    messages {
      items {
        id
        owner
        authUsers
        text
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
export const deleteAlbum = `mutation DeleteAlbum($input: DeleteAlbumInput!) {
  deleteAlbum(input: $input) {
    id
    name
    owner
    authUsers
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
    messages {
      items {
        id
        owner
        authUsers
        text
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
export const createMessage = `mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
    id
    owner
    authUsers
    type
    text
    album {
      id
      name
      owner
      authUsers
      group {
        id
        name
        owner
        authUsers
        createdAt
        updatedAt
      }
      messages {
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
export const updateMessage = `mutation UpdateMessage($input: UpdateMessageInput!) {
  updateMessage(input: $input) {
    id
    owner
    authUsers
    type
    text
    album {
      id
      name
      owner
      authUsers
      group {
        id
        name
        owner
        authUsers
        createdAt
        updatedAt
      }
      messages {
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
export const deleteMessage = `mutation DeleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input) {
    id
    owner
    authUsers
    type
    text
    album {
      id
      name
      owner
      authUsers
      group {
        id
        name
        owner
        authUsers
        createdAt
        updatedAt
      }
      messages {
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
export const createPhoto = `mutation CreatePhoto($input: CreatePhotoInput!) {
  createPhoto(input: $input) {
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
    message {
      id
      owner
      authUsers
      type
      text
      album {
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
}
`;
export const updatePhoto = `mutation UpdatePhoto($input: UpdatePhotoInput!) {
  updatePhoto(input: $input) {
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
    message {
      id
      owner
      authUsers
      type
      text
      album {
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
}
`;
export const deletePhoto = `mutation DeletePhoto($input: DeletePhotoInput!) {
  deletePhoto(input: $input) {
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
    message {
      id
      owner
      authUsers
      type
      text
      album {
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
}
`;
