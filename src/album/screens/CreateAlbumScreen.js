import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { getGroup } from '@group/GroupService'
import { createAlbum } from '@album/AlbumService'
// import { ALBUM } from '@navigation/routes'
import { WithInputs, ScreenBase, TextInput, Button, Text, Loading, Error } from '@global/components'
import { layout } from '@global/styles'

class CreateAlbumScreen extends WithInputs {
  state = { albumName: '', groupId: '', authUsers: [] }

  componentDidMount () {
    console.log(this.props)
  }

  createAlbum = () => {
    const { albumName } = this.state
    console.log('CALLING CREATE ALBUM (commented out)', albumName)

    // this.props.createAlbum({ variables: { { name: albumName, albumGroupId: groupId, authUsers } } })
  }

  render () {
    return (
      <ScreenBase avoidKeyboard contentContainer>
        <Text h5 style={{ width: '100%', marginBottom: layout.s2 }}>Name your album</Text>
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

const ConnectedCreateAlbumScreen = props => {
  const query = getGroup
  const queryVariables = { id: props.navigation.getParam('groupId') }
  const dataExtractor = ({ data: { getGroup }, loading, error }) => ({
    error,
    loading: loading || !getGroup,
    item: getGroup
  })
  const mutation = createAlbum
  const onMutationCompleted = params => {
    console.log('ALBUM CREATED:', params)
  }
  return (
    <Query query={query} variables={queryVariables} fetchPolicy='cache-and-network'>
      {({ subscribeToMore, ...data }) => {
        const { error, loading, item } = dataExtractor(data)
        if (error) return <Error />
        if (loading) return <Loading />
        return (
          <Mutation mutation={mutation} onCompleted={onMutationCompleted}>
            {mutate => (
              <CreateAlbumScreen group={item} createAlbum={mutate} {...props} />
            )}
          </Mutation>
        )
      }}
    </Query>
  )
}

export default ConnectedCreateAlbumScreen
