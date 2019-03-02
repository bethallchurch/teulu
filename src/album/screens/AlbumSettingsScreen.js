import React, { Component } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { graphqlOperation } from 'aws-amplify'
import { Connect } from 'aws-amplify-react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import * as queries from '@graphql/queries'
import Section from '@global/components/Section'
import Loading from '@global/components/Loading'
import Error from '@global/components/Error'
import { colors, subtitleStyle, copyStyle } from '@global/styles'

const AlbumSettings = ({ album }) => (
  <SafeAreaView>
    <View style={{ width: '100%', height: 200, backgroundColor: colors.textDefault, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      <MaterialIcons name='image' color={colors.primaryBackground} size={48} />
      <Text style={{ ...subtitleStyle.style, position: 'absolute', bottom: 16, left: 16, color: colors.primaryBackground, marginBottom: 0 }}>{album.name}</Text>
    </View>
  </SafeAreaView>
)

const ConnectedAlbumSettings = props => (
  <Connect
    query={graphqlOperation(queries.getAlbum, { id: props.navigation.getParam('albumId') })}
  >
    {({ data: { getAlbum }, loading, error }) => {
      if (error) return <Error />
      if (loading || !getAlbum) return <Loading />
      return <AlbumSettings album={getAlbum} {...props} />
    }}
  </Connect>
)

export default ConnectedAlbumSettings
