import React, { Component } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { ScreenBase, ActionButton } from '@global/components'
import { GroupAlbumList as AlbumList } from '@album/components/AlbumList'
import { CREATE_ALBUM } from '@navigation/routes'
import { colors, layout } from '@global/styles'

class GroupScreen extends Component {
  get groupId () {
    return this.props.navigation.getParam('groupId')
  }

  navigateToCreateAlbum = () => this.props.navigation.navigate(CREATE_ALBUM, {
    groupId: this.groupId
  })

  render () {
    return (
      <ScreenBase>
        <AlbumList groupId={this.groupId} navigation={this.props.navigation} />
        <ActionButton onPress={this.navigateToCreateAlbum}>
          <MaterialIcons name='add-to-photos' color={colors.primaryBackground} size={layout.s5} />
        </ActionButton>
      </ScreenBase>
    )
  }
}

export default GroupScreen
