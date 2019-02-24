import React, { Component } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { graphqlOperation } from 'aws-amplify'
import * as queries from '@graphql/queries'
import { Connect } from 'aws-amplify-react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import LoadingComponent from '@global/components/LoadingComponent'

const AlbumSettings = ({ album }) => (
  <SafeAreaView>
    <Card containerStyle={{ paddingHorizontal: 0 }}>
      <ListItem title={album.name} leftElement={<Text>Name</Text>} />
      <ListItem title={album.owner} leftElement={<Text>Owner</Text>} />
    </Card>
  </SafeAreaView>
)

const ConnectedAlbumSettings = props => (
  <Connect
    query={graphqlOperation(queries.getAlbum, { id: props.navigation.getParam('albumId') })}
  >
    {({ data: { getAlbum }, loading, error }) => {
      if (error) return <Text>Error</Text>
      if (loading || !getAlbum) return <LoadingComponent />
      return <AlbumSettings album={getAlbum} {...props} />
    }}
  </Connect>
)

export default ConnectedAlbumSettings
