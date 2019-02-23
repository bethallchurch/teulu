// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    id
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
    id
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
    id
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
export const onCreateGroupLink = `subscription OnCreateGroupLink {
  onCreateGroupLink {
    id
    user {
      id
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
export const onUpdateGroupLink = `subscription OnUpdateGroupLink {
  onUpdateGroupLink {
    id
    user {
      id
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
export const onDeleteGroupLink = `subscription OnDeleteGroupLink {
  onDeleteGroupLink {
    id
    user {
      id
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
export const onCreateGroup = `subscription OnCreateGroup {
  onCreateGroup {
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
export const onUpdateGroup = `subscription OnUpdateGroup {
  onUpdateGroup {
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
export const onDeleteGroup = `subscription OnDeleteGroup {
  onDeleteGroup {
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
export const onCreateAlbum = `subscription OnCreateAlbum {
  onCreateAlbum {
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
export const onUpdateAlbum = `subscription OnUpdateAlbum {
  onUpdateAlbum {
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
export const onDeleteAlbum = `subscription OnDeleteAlbum {
  onDeleteAlbum {
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
export const onCreateMessage = `subscription OnCreateMessage {
  onCreateMessage {
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
export const onUpdateMessage = `subscription OnUpdateMessage {
  onUpdateMessage {
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
export const onDeleteMessage = `subscription OnDeleteMessage {
  onDeleteMessage {
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
export const onCreatePhoto = `subscription OnCreatePhoto {
  onCreatePhoto {
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
export const onUpdatePhoto = `subscription OnUpdatePhoto {
  onUpdatePhoto {
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
export const onDeletePhoto = `subscription OnDeletePhoto {
  onDeletePhoto {
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
