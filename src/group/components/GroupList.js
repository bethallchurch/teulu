import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { Query } from 'react-apollo'
import { adopt } from 'react-adopt'
import { ListItem } from 'react-native-elements'
import { GROUP } from '@navigation/routes'
import { listGroups, onCreateGroup } from '@group/GroupService'
import { uniqueBy } from '@global/helpers'
import { UserContext } from '@global/context'
import { Error, Loading, Text } from '@global/components'
import { colors } from '@global/styles'

class GroupList extends Component {
  componentDidMount () {
    this.unsubscribe = this.props.subscribe()
  }

  componentWillUnmount () {
    this.unsubscribe && this.unsubscribe()
  }

  navigateToGroup = (id, name) => this.props.navigation.navigate(GROUP, {
    groupId: id,
    groupName: name
  })

  renderItem = ({ item: { id, name } }) => {
    return (
      <ListItem
        title={<Text subtitleOne>{name}</Text>}
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
        title={<Text subtitleOne>{name}</Text>}
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

const dataExtractor = ({ data: { listGroups }, loading, error }) => ({
  error,
  loading: loading || !listGroups,
  items: listGroups ? listGroups.items : []
})

const mapper = {
  user: <UserContext.Consumer />,
  groups: ({ compact, render }) => {
    const variables = compact ? { limit: 3 } : {}
    return (
      <Query query={listGroups} variables={variables} fetchPolicy='cache-and-network'>
        {({ data, subscribeToMore }) => render({ data, subscribeToMore })}
      </Query>
    )
  }
}

const mapProps = ({ user, groups }) => {
  const { error, loading, items } = dataExtractor({ data: groups.data })
  return {
    userId: user.id,
    error,
    loading,
    groups: items,
    subscribe: () => groups.subscribeToMore({
      document: onCreateGroup,
      updateQuery: (previous, { subscriptionData }) => {
        if (!subscriptionData.data) return previous
        const newItem = subscriptionData.data.onCreateGroup
        const newItems = uniqueBy([ ...previous.listGroups.items, newItem ], 'id')
        return { ...previous, listGroups: { ...previous.listGroups, items: newItems } }
      }
    })
  }
}

const Connect = adopt(mapper, mapProps)

const ConnectedGroupList = props => (
  <Connect compact={props.compact}>
    {({ userId, error, loading, groups, subscribe }) => {
      if (error) return <Error />
      if (loading) return <Loading />
      return <GroupList userId={userId} groups={groups} subscribe={subscribe} {...props} />
    }}
  </Connect>
)

export default ConnectedGroupList
