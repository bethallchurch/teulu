import React, { Component } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { ScreenBase, ActionButton } from '@global/components'
import GroupList from '@group/components/GroupList'
import { CREATE_GROUP } from '@navigation/routes'
import { colors, layout } from '@global/styles'

export default class GroupListScreen extends Component {
  render () {
    const { navigation: { navigate } } = this.props
    return (
      <ScreenBase>
        <GroupList navigation={this.props.navigation} />
        <ActionButton onPress={() => navigate(CREATE_GROUP)}>
          <MaterialIcons name='group-add' color={colors.secondaryBackground} size={layout.s5} />
        </ActionButton>
      </ScreenBase>
    )
  }
}
