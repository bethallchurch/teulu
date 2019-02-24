import React, { Component } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { graphqlOperation } from 'aws-amplify'
import * as queries from '@graphql/queries'
import { Connect } from 'aws-amplify-react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import Loading from '@global/components/Loading'
import Error from '@global/components/Error'

const GroupSettings = ({ group }) => (
  <SafeAreaView>
    <Card containerStyle={{ paddingHorizontal: 0 }}>
      <ListItem title={group.name} leftElement={<Text>Name</Text>} />
      <ListItem title={group.owner} leftElement={<Text>Owner</Text>} />
      <ListItem title={group.authUsers.join(', ')} leftElement={<Text>Members</Text>} />
    </Card>
  </SafeAreaView>
)

const ConnectedGroupSettings = props => (
  <Connect
    query={graphqlOperation(queries.getGroup, { id: props.navigation.getParam('groupId') })}
  >
    {({ data: { getGroup }, loading, error }) => {
      if (error) return <Error />
      if (loading || !getGroup) return <Loading />
      return <GroupSettings group={getGroup} {...props} />
    }}
  </Connect>
)

export default ConnectedGroupSettings
