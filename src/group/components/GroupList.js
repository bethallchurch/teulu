import React, { Component } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Query } from 'react-apollo'
import { adopt } from 'react-adopt'
import { GROUP, CREATE_GROUP } from '@navigation/routes'
import { LIST_GROUPS } from '@group/GroupService'
import { UserContext } from '@global/context'
import { Error, Loading } from '@global/components'
import GroupListItem, { SelectGroupListItem } from '@group/components/GroupListItem'
import CreateGroupButton from '@group/components/CreateGroupButton'
import { layout } from '@global/styles'

class GroupList extends Component {
  navigateToGroup = (id, name) => {
    this.props.navigation.navigate(GROUP, {
      groupId: id,
      groupName: name
    })
  }

  renderItem = ({ index, item }) => {
    const { navigation: { navigate } } = this.props
    return item.id === 'create-button' ? (
      <CreateGroupButton onPress={() => navigate(CREATE_GROUP)} />
    ) : (
      <GroupListItem
        id={item.id}
        group={item}
        index={index}
        navigateToGroup={this.navigateToGroup}
      />
    )
  }

  render () {
    const { createButton = false, groups } = this.props
    const data = createButton ? [{ id: 'create-button' }, ...groups] : groups
    return (
      <FlatList
        data={data}
        renderItem={this.renderItem}
        keyExtractor={({ id }) => id}
        style={styles.container}
      />
    )
  }
}

class SelectGroupList extends Component {
  renderItem = ({ index, item }) => {
    const { onPressItem, selectedGroupId } = this.props
    return (
      <SelectGroupListItem
        id={item.id}
        group={item}
        index={index}
        onPress={onPressItem}
        selected={item.id === selectedGroupId}
      />
    )
  }

  render () {
    const { groups, selectedGroupId } = this.props
    return (
      <FlatList
        data={groups}
        extraData={selectedGroupId}
        renderItem={this.renderItem}
        keyExtractor={({ id }) => id}
        style={styles.container}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: layout.s2,
    width: '100%'
  }
})

const dataExtractor = ({ data: { listGroups } = {}, loading, error }) => ({
  error,
  loading: loading || !listGroups,
  groups: listGroups ? listGroups.items : []
})

const mapper = {
  user: <UserContext.Consumer />,
  groupData: ({ compact, render }) => {
    const variables = compact ? { limit: 3 } : {}
    return (
      <Query query={LIST_GROUPS} variables={variables} pollInterval={1000}>
        {({ data }) => render(data)}
      </Query>
    )
  }
}

const mapProps = ({ user, groupData }) => {
  const { error, loading, groups } = dataExtractor({ data: groupData })
  return { userId: user.id, error, loading, groups }
}

const Connect = adopt(mapper, mapProps)

const ConnectedGroupList = props => (
  <Connect>
    {({ userId, error, loading, groups }) => {
      if (error) return <Error />
      if (loading) return <Loading />
      return <GroupList userId={userId} groups={groups} {...props} />
    }}
  </Connect>
)

export const ConnectedSelectGroupList = props => (
  <Connect>
    {({ userId, error, loading, groups }) => {
      if (error) return <Error />
      if (loading) return <Loading />
      return <SelectGroupList userId={userId} groups={groups} {...props} />
    }}
  </Connect>
)

export default ConnectedGroupList
