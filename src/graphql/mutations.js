// eslint-disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
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
    username
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
    username
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
export const createGroup = `mutation CreateGroup($input: CreateGroupInput!) {
  createGroup(input: $input) {
    id
    name
    owner
    membersLinks {
      items {
        id
      }
      nextToken
    }
    members
    createdAt
    updatedAt
    albums {
      items {
        id
        name
        owner
        contributors
      }
      nextToken
    }
  }
}
`;
export const updateGroup = `mutation UpdateGroup($input: UpdateGroupInput!) {
  updateGroup(input: $input) {
    id
    name
    owner
    membersLinks {
      items {
        id
      }
      nextToken
    }
    members
    createdAt
    updatedAt
    albums {
      items {
        id
        name
        owner
        contributors
      }
      nextToken
    }
  }
}
`;
export const deleteGroup = `mutation DeleteGroup($input: DeleteGroupInput!) {
  deleteGroup(input: $input) {
    id
    name
    owner
    membersLinks {
      items {
        id
      }
      nextToken
    }
    members
    createdAt
    updatedAt
    albums {
      items {
        id
        name
        owner
        contributors
      }
      nextToken
    }
  }
}
`;
export const createGroupLink = `mutation CreateGroupLink($input: CreateGroupLinkInput!) {
  createGroupLink(input: $input) {
    id
    user {
      id
      username
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
      membersLinks {
        nextToken
      }
      members
      createdAt
      updatedAt
      albums {
        nextToken
      }
    }
  }
}
`;
export const updateGroupLink = `mutation UpdateGroupLink($input: UpdateGroupLinkInput!) {
  updateGroupLink(input: $input) {
    id
    user {
      id
      username
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
      membersLinks {
        nextToken
      }
      members
      createdAt
      updatedAt
      albums {
        nextToken
      }
    }
  }
}
`;
export const deleteGroupLink = `mutation DeleteGroupLink($input: DeleteGroupLinkInput!) {
  deleteGroupLink(input: $input) {
    id
    user {
      id
      username
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
      membersLinks {
        nextToken
      }
      members
      createdAt
      updatedAt
      albums {
        nextToken
      }
    }
  }
}
`;
export const createAlbum = `mutation CreateAlbum($input: CreateAlbumInput!) {
  createAlbum(input: $input) {
    id
    name
    owner
    contributors
    group {
      id
      name
      owner
      membersLinks {
        nextToken
      }
      members
      createdAt
      updatedAt
      albums {
        nextToken
      }
    }
    messages {
      items {
        id
        owner
        viewers
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
}
`;
export const updateAlbum = `mutation UpdateAlbum($input: UpdateAlbumInput!) {
  updateAlbum(input: $input) {
    id
    name
    owner
    contributors
    group {
      id
      name
      owner
      membersLinks {
        nextToken
      }
      members
      createdAt
      updatedAt
      albums {
        nextToken
      }
    }
    messages {
      items {
        id
        owner
        viewers
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
}
`;
export const deleteAlbum = `mutation DeleteAlbum($input: DeleteAlbumInput!) {
  deleteAlbum(input: $input) {
    id
    name
    owner
    contributors
    group {
      id
      name
      owner
      membersLinks {
        nextToken
      }
      members
      createdAt
      updatedAt
      albums {
        nextToken
      }
    }
    messages {
      items {
        id
        owner
        viewers
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
}
`;
export const createMessage = `mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
    id
    owner
    viewers
    album {
      id
      name
      owner
      contributors
      group {
        id
        name
        owner
        members
        createdAt
        updatedAt
      }
      messages {
        nextToken
      }
    }
    content
    type
    createdAt
    updatedAt
  }
}
`;
export const updateMessage = `mutation UpdateMessage($input: UpdateMessageInput!) {
  updateMessage(input: $input) {
    id
    owner
    viewers
    album {
      id
      name
      owner
      contributors
      group {
        id
        name
        owner
        members
        createdAt
        updatedAt
      }
      messages {
        nextToken
      }
    }
    content
    type
    createdAt
    updatedAt
  }
}
`;
export const deleteMessage = `mutation DeleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input) {
    id
    owner
    viewers
    album {
      id
      name
      owner
      contributors
      group {
        id
        name
        owner
        members
        createdAt
        updatedAt
      }
      messages {
        nextToken
      }
    }
    content
    type
    createdAt
    updatedAt
  }
}
`;
