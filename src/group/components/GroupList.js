import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { graphqlOperation }  from 'aws-amplify'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'
import { Connect } from 'aws-amplify-react-native'
import { ListItem } from 'react-native-elements'
import { GROUP } from '@navigation/routes'
import LoadingComponent from '@global/components/LoadingComponent'

class GroupList extends Component {
  navigateToGroup = (id, name) => this.props.navigation.navigate(GROUP, {
    groupId: id,
    groupName: name
  })

  render () {
    return (
      <View>
        {this.props.groups.map(({ id, name }) => (
          <ListItem
            key={id}
            title={name}
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
      if (loading || !listGroups) return <LoadingComponent />
      return <GroupList groups={listGroups.items} {...props} />
    }}
  </Connect>
)

export default ConnectedGroupList
