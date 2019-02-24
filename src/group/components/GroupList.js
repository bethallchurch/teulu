import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { graphqlOperation }  from 'aws-amplify'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'
import { Connect } from 'aws-amplify-react-native'
import { ListItem } from 'react-native-elements'
import { GROUP } from '@navigation/routes'
import { UserContext } from '@global/context'
import Loading from '@global/components/Loading'
import Error from '@global/components/Error'
import { colors, copyStyle } from '@global/styles'

// TODO: FlatList

class GroupList extends Component {
  navigateToGroup = (id, name) => this.props.navigation.navigate(GROUP, {
    groupId: id,
    groupName: name
  })

  renderItem = ({ item: { id, name }}) => {
    return (
      <ListItem
        title={name}
        titleStyle={copyStyle.regular}
        onPress={() => this.navigateToGroup(id, name)}
        style={{ marginHorizontal: 16, marginVertical: 8 }}
        contentContainerStyle={{ padding: 8 }}
        leftAvatar={{ rounded: true, title: name[0], overlayContainerStyle: { backgroundColor: colors.textDefault }}}
        rightIcon={{ name: 'chevron-right', color: colors.textLight }}
      />
    )
  }

  render () {
    return (
      <FlatList
        style={{ paddingVertical: 8 }}
        keyExtractor={({ id }) => id}
        data={this.props.groups}
        renderItem={this.renderItem}
      />
    )
  }
}

const ConnectedGroupList = props => {
  const { userId } = props
  const filter = { authUsers: { contains: userId }}
  return (
    <Connect
      query={graphqlOperation(queries.listGroups, { filter })}
      subscription={graphqlOperation(subscriptions.onCreateGroup, { filter })}
      onSubscriptionMsg={(previous, { onCreateGroup }) => {
        const { listGroups } = previous
        const newItems = [ onCreateGroup, ...listGroups.items ]
        return { ...previous, listGroups: { ...listGroups, items: newItems } }
      }}
    >
      {({ data: { listGroups }, loading, error }) => {
        if (error) return <Error />
        if (loading || !listGroups) return <Loading />
        return <GroupList groups={listGroups.items} {...props} />
      }}
    </Connect>
  )
}

const GroupListWithContext = props => (
  <UserContext.Consumer>
    {user => user.id ? <ConnectedGroupList userId={user.id} {...props} /> : <Loading />}
  </UserContext.Consumer>
)

export default GroupListWithContext
