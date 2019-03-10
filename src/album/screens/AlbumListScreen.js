import React, { Component } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { ScreenBase, ActionButton } from '@global/components'
import AlbumList, { GroupAlbumList } from '@album/components/AlbumList'
import { CREATE_ALBUM } from '@navigation/routes'
import { colors, layout } from '@global/styles'

class GroupScreen extends Component {
  get groupId () {
    return this.props.navigation.getParam('groupId')
  }

  navigateToCreateAlbum = () => {
    this.props.navigation.navigate(CREATE_ALBUM, {
      groupId: this.groupId
    })
  }

  render () {
    return (
      <ScreenBase>
        {this.groupId && (
          <>
            <GroupAlbumList
              groupId={this.groupId}
              navigation={this.props.navigation}
              containerPadding={layout.s3}
              gutterWidth={layout.s3}
              numColumns={2}
            />
            <ActionButton onPress={this.navigateToCreateAlbum}>
              <MaterialIcons name='add-to-photos' color={colors.primaryBackground} size={layout.s5} />
            </ActionButton>
          </>
        )}
        {!this.groupId && (
          <AlbumList
            navigation={this.props.navigation}
            containerPadding={layout.s3}
            gutterWidth={layout.s3}
            numColumns={2}
          />
        )}
      </ScreenBase>
    )
  }
}

export default GroupScreen
