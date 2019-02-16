// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateGroup = `subscription OnCreateGroup {
  onCreateGroup {
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
export const onUpdateGroup = `subscription OnUpdateGroup {
  onUpdateGroup {
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
export const onDeleteGroup = `subscription OnDeleteGroup {
  onDeleteGroup {
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
export const onCreateGroupLink = `subscription OnCreateGroupLink {
  onCreateGroupLink {
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
export const onUpdateGroupLink = `subscription OnUpdateGroupLink {
  onUpdateGroupLink {
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
export const onDeleteGroupLink = `subscription OnDeleteGroupLink {
  onDeleteGroupLink {
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
export const onCreateAlbum = `subscription OnCreateAlbum {
  onCreateAlbum {
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
        bucket
        createdAt
        updatedAt
      }
      nextToken
    }
  }
}
`;
export const onUpdateAlbum = `subscription OnUpdateAlbum {
  onUpdateAlbum {
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
        bucket
        createdAt
        updatedAt
      }
      nextToken
    }
  }
}
`;
export const onDeleteAlbum = `subscription OnDeleteAlbum {
  onDeleteAlbum {
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
        bucket
        createdAt
        updatedAt
      }
      nextToken
    }
  }
}
`;
export const onCreateMessage = `subscription OnCreateMessage {
  onCreateMessage {
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
    createdAt
    updatedAt
  }
}
`;
export const onUpdateMessage = `subscription OnUpdateMessage {
  onUpdateMessage {
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
    createdAt
    updatedAt
  }
}
`;
export const onDeleteMessage = `subscription OnDeleteMessage {
  onDeleteMessage {
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
    createdAt
    updatedAt
  }
}
`;
