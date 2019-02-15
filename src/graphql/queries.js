// eslint-disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      phoneNumber
      groups {
        nextToken
      }
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const getGroup = `query GetGroup($id: ID!) {
  getGroup(id: $id) {
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
    nextToken
  }
}
`;
export const getGroupLink = `query GetGroupLink($id: ID!) {
  getGroupLink(id: $id) {
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
        username
        phoneNumber
        createdAt
        updatedAt
      }
      group {
        id
        name
        owner
        members
        createdAt
        updatedAt
      }
    }
    nextToken
  }
}
`;
export const getAlbum = `query GetAlbum($id: ID!) {
  getAlbum(id: $id) {
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
    nextToken
  }
}
`;
export const getMessage = `query GetMessage($id: ID!) {
  getMessage(id: $id) {
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
export const listMessages = `query ListMessages(
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      viewers
      album {
        id
        name
        owner
        contributors
      }
      content
      type
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
