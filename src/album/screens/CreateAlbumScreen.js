import React from 'react'
import { StyleSheet } from 'react-native'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import uuid from 'uuid/v4'
import { GET_GROUP } from '@group/GroupService'
import { CREATE_ALBUM } from '@album/AlbumService'
import { ALBUM } from '@navigation/routes'
import { UserContext } from '@global/context'
import { WithInputs, ScreenBase, TextInput, Button, Text, Loading, Error } from '@global/components'
import { layout } from '@global/styles'

class CreateAlbumScreen extends WithInputs {
  state = { albumName: '' }

  createAlbum = () => {
    const { albumName } = this.state
    const { userId, groupId, authUsers } = this.props
    const input = { id: uuid(), owner: userId, name: albumName, albumGroupId: groupId, authUsers }
    this.props.createAlbum({ input })
  }

  render () {
    return (
      <ScreenBase avoidKeyboard contentContainer>
        <Text h5 style={styles.title}>Name your album</Text>
        <TextInput
          placeholder='Album Name'
          value={this.state.albumName}
          returnKeyType='go'
          autoCorrect={false}
          onChangeText={value => this.onChangeText('albumName', value)}
        />
        <Button onPress={this.createAlbum}>Create Album</Button>
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

const dataExtractor = ({ data: { getGroup }, loading, error }) => ({
  error,
  loading: loading || !getGroup,
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
          group: {
            __typename: 'ModelGroupConnection',
            ...group
          },
          photos: {
            __typename: 'ModelPhotoConnection',
            items: [],
            nextToken: null
          },
          createdAt: time,
          updatedAt: time
        }
      }
      const update = async (cache, { data: { createAlbum } }) => {
        const query = GET_GROUP
        const variables = { id: createAlbum.albumGroupId }
        const data = cache.readQuery({ query, variables })
        data.getGroup.albums.items = [ createAlbum, ...data.getGroup.albums.items ]
        cache.writeQuery({ query, variables, data })
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
          groupId={group.id}
          authUsers={group.authUsers}
          createAlbum={createAlbum}
          {...props}
        />
      )
    }}
  </Connect>
)

export default ConnectedCreateAlbumScreen
