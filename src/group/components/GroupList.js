import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { graphqlOperation } from 'aws-amplify'
import * as queries from '@graphql/queries'
import * as subscriptions from '@graphql/subscriptions'
import { Connect } from 'aws-amplify-react-native'
import { ListItem } from 'react-native-elements'
import { GROUP } from '@navigation/routes'
import { uniqueBy } from '@global/helpers'
import { UserContext } from '@global/context'
import Loading from '@global/components/Loading'
import Error from '@global/components/Error'
import { colors, copyStyle } from '@global/styles'

class GroupList extends Component {
  navigateToGroup = (id, name) => this.props.navigation.navigate(GROUP, {
    groupId: id,
    groupName: name
  })

  renderItem = ({ item: { id, name } }) => {
    return (
      <ListItem
        title={name}
        titleStyle={copyStyle.regular}
        onPress={() => this.navigateToGroup(id, name)}
        style={{ marginHorizontal: 16, marginVertical: 8 }}
        contentContainerStyle={{ padding: 8 }}
        leftAvatar={{ rounded: true, title: name[0], overlayContainerStyle: { backgroundColor: colors.textDefault } }}
        rightIcon={{ name: 'chevron-right', color: colors.textLight }}
      />
    )
  }

  renderItemCompact = ({ item: { id, name }, index }) => {
    return (
      <ListItem
        title={name}
        titleStyle={copyStyle.regular}
        containerStyle={{ paddingVertical: 8 }}
        onPress={() => this.navigateToGroup(id, name)}
        leftAvatar={{ rounded: true, title: name[0], overlayContainerStyle: { backgroundColor: colors.textDefault } }}
        rightIcon={{ name: 'chevron-right', color: colors.textLight }}
        topDivider={index !== 0}
      />
    )
  }

  render () {
    const { compact = false } = this.props
    return (
      <FlatList
        style={compact ? {} : { paddingVertical: 8 }}
        keyExtractor={({ id }) => id}
        data={this.props.groups}
        renderItem={compact ? this.renderItemCompact : this.renderItem}
      />
    )
  }
}

// TODO: subscription query filter not working
const ConnectedGroupList = props => {
  const { userId, compact } = props
  const filter = { authUsers: { contains: userId } }
  // Limit is being WEIRD and showing just one group
  const queryParams = compact ? {} : { filter } // { limit: 3 }
  return (
    <Connect
      query={graphqlOperation(queries.listGroups, queryParams)}
      subscription={graphqlOperation(subscriptions.onCreateGroup, queryParams)}
      onSubscriptionMsg={(previous, { onCreateGroup }) => {
        const { listGroups } = previous
        if (!onCreateGroup.authUsers.includes(userId)) {
          return previous
        }
        const newItems = uniqueBy([ onCreateGroup, ...listGroups.items ], 'id')
        return { ...previous, listGroups: { ...listGroups, items: newItems } }
      }}
    >
      {({ data: { listGroups }, loading, error }) => {
        if (error) return <Error />
        if (loading || !listGroups) return <Loading />
        const items = compact ? listGroups.items.slice(0, 3) : listGroups.items
        return <GroupList groups={items} {...props} />
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
