import React from 'react'
import { Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import { UPDATE_GROUP } from '@group/GroupService'
import { GROUP } from '@navigation/routes'
import { WithInputs, ScreenBase, TextInput, Button, Text } from '@global/components'
import { layout } from '@global/styles'

class UpdateGroup extends WithInputs {
  state = { groupName: '' }

  componentDidMount () {
    this.setState({ groupName: this.props.groupName })
  }

  updateGroup = () => {
    this.props.updateGroup({ input: { name: this.state.groupName } })
  }

  render () {
    const { groupName } = this.state
    return (
      <ScreenBase avoidKeyboard contentContainer>
        <Text h5 style={{ width: '100%', marginBottom: layout.s2 }}>Update Group</Text>
        <TextInput
          placeholder='Group Name'
          value={groupName}
          returnKeyType='go'
          autoCorrect={false}
          onChangeText={value => this.onChangeText('groupName', value)}
        />
        <Button onPress={this.updateGroup}>Update Group</Button>
      </ScreenBase>
    )
  }
}

const mapper = {
  updateGroup: ({ groupId, navigate, render }) => (
    <Mutation
      mutation={UPDATE_GROUP}
      onCompleted={async ({ updateGroup }) => {
        navigate(GROUP, ({ groupId: updateGroup.id, groupName: updateGroup.name }))
      }}
    >
      {mutation => render({ groupId, mutation })}
    </Mutation>
  )
}

const mapProps = ({ updateGroup: { groupId, mutation } }) => ({
  updateGroup: ({ input }) => {
    mutation({ variables: { input: { id: groupId, ...input } } })
  }
})

const Connect = adopt(mapper, mapProps)

const ConnectedUpdateGroup = props => (
  <Connect groupId={props.navigation.getParam('groupId')} navigate={props.navigation.navigate}>
    {({ updateGroup }) => (
      <UpdateGroup
        {...props}
        updateGroup={updateGroup}
        groupName={props.navigation.getParam('groupName')}
      />
    )}
  </Connect>
)

export default ConnectedUpdateGroup
