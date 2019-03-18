import React, { Component } from 'react'
import { ScreenBase } from '@global/components'
import AlbumList, { GroupAlbumList } from '@album/components/AlbumList'
import { layout } from '@global/styles'

class GroupScreen extends Component {
  get groupId () {
    return this.props.navigation.getParam('groupId')
  }

  render () {
    return (
      <ScreenBase>
        {this.groupId && (
          <GroupAlbumList
            groupId={this.groupId}
            navigation={this.props.navigation}
            containerPadding={layout.s3}
            gutterWidth={layout.s3}
            numColumns={2}
            createButton
          />
        )}
        {!this.groupId && (
          <AlbumList
            navigation={this.props.navigation}
            containerPadding={layout.s3}
            gutterWidth={layout.s3}
            numColumns={2}
            createButton
          />
        )}
      </ScreenBase>
    )
  }
}

export default GroupScreen
