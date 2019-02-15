import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { graphqlOperation }  from 'aws-amplify'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'
import { Connect } from 'aws-amplify-react-native'
import { ListItem } from 'react-native-elements'

class GroupList extends Component {
  navigateToGroup = (id, name) => this.props.navigation.navigate('Group', {
    groupId: id,
    groupName: name
  })

  render () {
    return (
      <View>
        {this.props.groups.map(({ id, name, members }) => (
          <ListItem
            key={id}
            title={name}
            subtitle={members.join(', ')}
            bottomDivider
            onPress={() => this.navigateToGroup(id, name)}
          />
        ))}
      </View>
    )
  }
}

const ConnectedGroupList = props => (
  <Connect
    query={graphqlOperation(queries.listGroups)}
    subscription={graphqlOperation(subscriptions.onCreateGroup)}
    onSubscriptionMsg={(previous, { onCreateGroup }) => {
      // TODO: check it's a group the user belongs to.
      const { listGroups } = previous
      const newItems = [ onCreateGroup, ...listGroups.items ]
      return { ...previous, listGroups: { ...listGroups, items: newItems } }
    }}
  >
    {({ data: { listGroups }, loading, error }) => {
      if (error) return <Text>Error</Text>
      if (loading || !listGroups) return <Text>Loading...</Text>
      return <GroupList groups={listGroups.items} {...props} />
    }}
  </Connect>
)

export default ConnectedGroupList
