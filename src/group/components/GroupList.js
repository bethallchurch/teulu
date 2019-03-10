import React, { Component } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Query } from 'react-apollo'
import { adopt } from 'react-adopt'
import { GROUP } from '@navigation/routes'
import { LIST_GROUPS } from '@group/GroupService'
import { UserContext } from '@global/context'
import { Error, Loading } from '@global/components'
import GroupListItem from '@group/components/GroupListItem'
import { layout } from '@global/styles'

class GroupList extends Component {
  navigateToGroup = (id, name) => {
    this.props.navigation.navigate(GROUP, {
      groupId: id,
      groupName: name
    })
  }

  render () {
    const { compact = false } = this.props
    return (
      <FlatList
        style={compact ? {} : styles.container}
        keyExtractor={({ id }) => id}
        data={this.props.groups}
        renderItem={({ item: { id, name }, index }) => (
          <GroupListItem
            id={id}
            compact={compact}
            title={name}
            index={index}
            navigateToGroup={this.navigateToGroup}
          />
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: layout.s2
  }
})

const dataExtractor = ({ data: { listGroups }, loading, error }) => ({
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
  <Connect compact={props.compact}>
    {({ userId, error, loading, groups }) => {
      if (error) return <Error />
      if (loading) return <Loading />
      return <GroupList userId={userId} groups={groups} {...props} />
    }}
  </Connect>
)

export default ConnectedGroupList
