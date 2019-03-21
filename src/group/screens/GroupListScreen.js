import React, { Component } from 'react'
import { ScreenBase } from '@global/components'
import GroupList from '@group/components/GroupList'

export default class GroupListScreen extends Component {
  render () {
    return (
      <ScreenBase headerVisible={false}>
        <GroupList createButton navigation={this.props.navigation} />
      </ScreenBase>
    )
  }
}
