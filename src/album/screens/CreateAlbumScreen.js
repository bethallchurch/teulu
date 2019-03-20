import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import uuid from 'uuid/v4'
import { GET_GROUP } from '@group/GroupService'
import { CREATE_ALBUM, LIST_ALBUMS } from '@album/AlbumService'
import { ALBUM } from '@navigation/routes'
import { isEmpty, deepEqual } from '@global/helpers'
import { UserContext } from '@global/context'
import { WithInputs, ScreenBase, TextInput, Button, Text, Loading, Error } from '@global/components'
import SelectGroupDropdown from '@group/components/SelectGroupDropdown'
import { layout } from '@global/styles'

class CreateAlbumScreen extends WithInputs {
  state = { albumName: '', group: {} }

  componentDidMount () {
    this.setState({ group: this.props.group })
  }

  componentDidUpdate (prevProps) {
    if (!deepEqual(prevProps.group, this.props.group)) {
      this.setState({ group: this.props.group })
    }
  }

  createAlbum = () => {
    const { albumName, group } = this.state
    const { userId, authUsers, createAlbum } = this.props
    const input = { id: uuid(), owner: userId, name: albumName, authUsers: [ userId ] }
    createAlbum({ input: group.id ? { ...input, albumGroupId: group.id, authUsers } : input })
  }

  render () {
    const { group, albumName } = this.state
    const { group: initialGroup, navigation } = this.props
    return (
      <ScreenBase avoidKeyboard contentContainer>
        <View style={styles.fieldOne}>
          <Text h5 style={styles.title}>Name your album</Text>
          <TextInput
            placeholder='Album Name'
            value={albumName}
            returnKeyType='go'
            autoCorrect={false}
            onChangeText={value => this.onChangeText('albumName', value)}
          />
        </View>
        {!initialGroup.id && (
          <View style={styles.fieldTwo}>
            <Text h5 style={styles.title}>Choose group</Text>
            <SelectGroupDropdown
              closeOnSelect
              navigation={navigation}
              selectedGroupId={group.id}
              onSelectGroup={group => this.setState({ group })}
            >
              {group.name}
            </SelectGroupDropdown>
          </View>
        )}
        <Button onPress={this.createAlbum}>Create Album</Button>
      </ScreenBase>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    width: '100%',
    marginBottom: layout.s2
  },
  fieldOne: {
    width: '100%',
    marginBottom: layout.s3
  },
  fieldTwo: {
    width: '100%',
    marginBottom: layout.s6
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
