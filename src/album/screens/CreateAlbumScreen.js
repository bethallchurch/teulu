import React from 'react'
import { StyleSheet } from 'react-native'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import uuid from 'uuid/v4'
import { GET_GROUP } from '@group/GroupService'
import { CREATE_ALBUM, LIST_ALBUMS } from '@album/AlbumService'
import { GROUP_LIST, ALBUM } from '@navigation/routes'
import { isEmpty } from '@global/helpers'
import { UserContext } from '@global/context'
import { WithInputs, ScreenBase, TextInput, Button, Text, Loading, Error, Link, LinkContainer } from '@global/components'
import { layout } from '@global/styles'

class CreateAlbumScreen extends WithInputs {
  state = { albumName: '' }

  createAlbum = () => {
    const { albumName } = this.state
    const { userId, group, authUsers, createAlbum } = this.props
    const input = { id: uuid(), owner: userId, name: albumName, authUsers: [ userId ] }
    createAlbum({ input: group.id ? { ...input, albumGroupId: group.id, authUsers } : input })
  }

  render () {
    const { group, navigation: { navigate } } = this.props
    return (
      <ScreenBase avoidKeyboard contentContainer>
        {group.name && <Text caption style={styles.title}>Shared album in {group.name}</Text>}
        {!group.name && <Text caption style={styles.title}>Private album</Text>}
        <Text h5 style={styles.title}>Name your album</Text>
        <TextInput
          placeholder='Album Name'
          value={this.state.albumName}
          returnKeyType='go'
          autoCorrect={false}
          onChangeText={value => this.onChangeText('albumName', value)}
        />
        <Button onPress={this.createAlbum}>Create Album</Button>
        {!group.name && (
          <LinkContainer>
            <Link onPress={() => navigate(GROUP_LIST)}>Create shared album instead?</Link>
          </LinkContainer>
        )}
      </ScreenBase>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    width: '100%',
    marginBottom: layout.s2
  }
})

const dataExtractor = ({ data: { getGroup = {} } = {}, loading, error }) => ({
  error,
  loading: loading,
  group: getGroup
})

const mapper = {
  user: <UserContext.Consumer />,
  groupData: ({ groupId, render }) => {
    const variables = { id: groupId }
    return (
      <Query query={GET_GROUP} variables={variables}>
        {({ data }) => render(data)}
      </Query>
    )
  },
  createAlbum: ({ navigate, render }) => (
    <Mutation mutation={CREATE_ALBUM}>
      {mutation => render({
        mutation,
        navigateToAlbum: ({ albumId, albumName }) => navigate(ALBUM, ({ albumId, albumName }))
      })}
    </Mutation>
  )
}

const mapProps = ({ user, groupData, createAlbum }) => {
  const { error, loading, group } = dataExtractor({ data: groupData })
  return {
    userId: user.id,
    error,
    loading,
    group,
    createAlbum: ({ input }) => {
      const { navigateToAlbum } = createAlbum
      const time = new Date().toISOString()
      const optimisticResponse = {
        createAlbum: {
          __typename: 'Album',
          ...input,
          photos: {
            __typename: 'ModelPhotoConnection',
            items: [],
            nextToken: null
          },
          group: !isEmpty(group) ? {
            __typename: 'ModelGroupConnection',
            ...group
          } : null,
          albumGroupId: createAlbum.albumGroupId || null,
          createdAt: time,
          updatedAt: time
        }
      }
      const update = async (cache, { data: { createAlbum } }) => {
        const query = LIST_ALBUMS
        const data = cache.readQuery({ query })
        data.listAlbums.items = [ createAlbum, ...data.listAlbums.items ]
        cache.writeQuery({ query, data })
        navigateToAlbum({ albumId: createAlbum.id, albumName: createAlbum.name })
      }
      createAlbum.mutation({ variables: { input }, optimisticResponse, update })
    }
  }
}

const Connect = adopt(mapper, mapProps)

const ConnectedCreateAlbumScreen = props => (
  <Connect groupId={props.navigation.getParam('groupId')} navigate={props.navigation.navigate}>
    {({ userId, error, loading, group, createAlbum }) => {
      if (error) return <Error />
      if (loading) return <Loading />
      return (
        <CreateAlbumScreen
          userId={userId}
          group={group}
          authUsers={group.authUsers}
          createAlbum={createAlbum}
          {...props}
        />
      )
    }}
  </Connect>
)

export default ConnectedCreateAlbumScreen
