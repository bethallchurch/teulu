import React, { Component } from 'react'
import { View, Alert, StyleSheet } from 'react-native'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import { MaterialIcons } from '@expo/vector-icons'
import { ListItem } from 'react-native-elements'
import * as routes from '@navigation/routes'
import { GET_GROUP, UPDATE_GROUP, DELETE_GROUP, DELETE_GROUP_LINK, CREATE_GROUP_LINK, LIST_GROUPS } from '@group/GroupService'
import { LIST_CONTACTS } from '@contact/ContactService'
import { UPDATE_USER } from '@user/UserService'
import { UserContext } from '@global/context'
import { ScreenBase, Text, Error, Loading } from '@global/components'
import { colors, layout } from '@global/styles'

// TODO: Top same as AlbumSettingsScreen
class GroupSettingsScreen extends Component {
  get chevronProps () {
    return { name: 'chevron-right', color: colors.textLight }
  }

  get membersString () {
    const { currentMembers } = this.props
    return currentMembers.reduce((str, { name4 }, index) => {
      if (currentMembers.length === 1) {
        return name4
      }
      if (index === currentMembers.length - 1) {
        return `${str} and ${name4}.`
      }
      return `${str}, ${name4}`
    }, '')
  }

  confirmExit = () => {
    const { group, exitGroup } = this.props
    Alert.alert(
      'Confirm Exit Group',
      `Are you sure you want to leave ${group.name}? Make sure you've saved any albums you want to keep.`,
      [{
        text: 'Cancel',
        style: 'cancel'
      }, {
        text: 'Leave',
        onPress: exitGroup,
        style: 'destructive'
      }]
    )
  }

  render () {
    const { group, currentMembers, navigation: { navigate } } = this.props
    return (
      <ScreenBase style={styles.container}>
        <View style={styles.imageContainer}>
          <MaterialIcons name='image' color={colors.primaryBackground} size={layout.s6} />
          <Text h4 color={colors.primaryBackground} style={styles.imageCaption}>{group.name}</Text>
        </View>
        <View style={styles.contentContainer}>
          <ListItem
            underlayColor='transparent'
            containerStyle={styles.item}
            rightIcon={this.chevronProps}
            title={<Text subtitleOne>Edit group</Text>}
            leftIcon={{ name: 'pencil', type: 'material-community', color: colors.textDefault }}
            onPress={() => navigate(routes.UPDATE_GROUP, { groupId: group.id, groupName: group.name })}
          />
          <ListItem
            title={<Text subtitleOne>{`${currentMembers.length} ${currentMembers.length === 1 ? 'member' : 'members'}`}</Text>}
            subtitle={<Text caption color={colors.textLight}>{this.membersString}</Text>}
            rightIcon={this.chevronProps}
            leftIcon={{ name: 'people', color: colors.textDefault }}
            onPress={() => navigate(routes.GROUP_MEMBERS, { groupId: group.id })}
            containerStyle={styles.item}
            underlayColor='transparent'
          />
          <ListItem
            onPress={this.confirmExit}
            underlayColor='transparent'
            title={<Text color={colors.danger} subtitleOne>Exit group</Text>}
            leftIcon={{ name: 'exit-run', color: colors.danger, type: 'material-community' }}
          />
        </View>
      </ScreenBase>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start'
  },
  contentContainer: {
    padding: layout.s3
  },
  item: {
    marginBottom: layout.s3
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: colors.textDefault,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  imageCaption: {
    position: 'absolute',
    bottom: layout.s3,
    left: layout.s3,
    marginBottom: 0
  }
})

const groupDataExtractor = ({ data: { getGroup } = {}, loading, error }) => ({
  error,
  loading: loading || !getGroup,
  group: getGroup
})

const membersDataExtractor = ({ data: { listUsers } = {}, loading, error }) => ({
  error,
  loading: loading || !listUsers,
  members: listUsers ? listUsers.items : []
})

const mapper = {
  user: <UserContext.Consumer />,
  groupData: ({ groupId, render }) => {
    return (
      <Query query={GET_GROUP} variables={{ id: groupId }}>
        {groupData => render(groupData)}
      </Query>
    )
  },
  memberData: ({ render, groupData = {} }) => {
    const { authUsers = [] } = (groupData.data || {}).getGroup || {}
    const variables = { filter: { id: { in: authUsers } } }
    return (
      <Query query={LIST_CONTACTS} variables={variables}>
        {memberData => render(memberData)}
      </Query>
    )
  },
  updateGroup: ({ render }) => (
    <Mutation mutation={UPDATE_GROUP}>
      {mutation => render(mutation)}
    </Mutation>
  ),
  deleteGroup: ({ render }) => (
    <Mutation mutation={DELETE_GROUP}>
      {mutation => render(mutation)}
    </Mutation>
  ),
  updateUser: ({ render }) => (
    <Mutation mutation={UPDATE_USER}>
      {mutation => render(mutation)}
    </Mutation>
  ),
  createGroupLink: ({ render }) => (
    <Mutation mutation={CREATE_GROUP_LINK}>
      {mutation => render(mutation)}
    </Mutation>
  ),
  deleteGroupLink: ({ navigate, render }) => (
    <Mutation mutation={DELETE_GROUP_LINK}>
      {mutation => render({ navigate, mutation })}
    </Mutation>
  )
}

const mapProps = ({
  user,
  groupData,
  updateUser,
  memberData,
  updateGroup,
  deleteGroup,
  createGroupLink,
  deleteGroupLink: { mutation: deleteLink, navigate }
}) => {
  const { error: groupError, loading: groupLoading, group } = groupDataExtractor(groupData)
  const { error: membersError, loading: membersLoading, members } = membersDataExtractor(memberData)
  return {
    error: groupError || membersError,
    loading: groupLoading && membersLoading,
    group,
    members,
    exitGroup: async () => {
      try {
        const link = group.userLinks.items.find(({ user: { id } }) => id === user.id) || {}
        const remainingUsers = group.authUsers.filter(id => id !== user.id)
        if (link.id) {
          const update = async (cache, { data: { deleteGroupLink } }) => {
            navigate(routes.GROUP_LIST)
            const query = LIST_GROUPS
            const groups = cache.readQuery({ query })
            const itemExists = groups.listGroups.items.map(({ id }) => id).includes(deleteGroupLink.group.id)
            if (itemExists) {
              groups.listGroups.items = groups.listGroups.items.filter(({ id }) => id !== deleteGroupLink.group.id)
              await cache.writeQuery({ query, data: groups })
            }
          }
          await deleteLink({ variables: { input: { id: link.id } }, update })
          if (remainingUsers.length === 0) {
            // TODO: should probs delete all albums and photos as well
            await deleteGroup({ variables: { input: { id: group.id } } })
          } else {
            await updateGroup({
              variables: {
                input: {
                  id: group.id,
                  authUsers: remainingUsers,
                  owner: group.owner === user.id ? null : group.owner
                }
              }
            })
          }
        }
      } catch (error) {
        console.log('Error exiting group:', error)
      }
    }
  }
}

const Connect = adopt(mapper, mapProps)

const ConnectedGroupSettingsScreen = props => {
  return (
    <Connect groupId={props.navigation.getParam('groupId')} navigate={props.navigation.navigate}>
      {({ error, loading, group, members, exitGroup }) => {
        if (error) return <Error />
        if (loading) return <Loading />
        return (
          <GroupSettingsScreen
            {...props}
            group={group}
            exitGroup={exitGroup}
            currentMembers={members}
          />
        )
      }}
    </Connect>
  )
}

export default ConnectedGroupSettingsScreen
