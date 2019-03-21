import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { ScreenBase, Text } from '@global/components'
import AlbumList, { GroupAlbumList } from '@album/components/AlbumList'
import { layout } from '@global/styles'

class GroupScreen extends Component {
  get groupId () {
    return this.props.navigation.getParam('groupId')
  }

  get groupName () {
    return this.props.navigation.getParam('groupName')
  }

  render () {
    return (
      <ScreenBase headerVisible={!!this.groupId}>
        {this.groupId && (
          <>
            <Text h5 style={styles.title}>{this.groupName}</Text>
            <GroupAlbumList
              groupId={this.groupId}
              navigation={this.props.navigation}
              containerPadding={layout.s3}
              gutterWidth={layout.s3}
              numColumns={2}
              createButton
            />
          </>
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

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100
  },
  title: {
    width: '100%',
    margin: layout.s4
  }
})

export default GroupScreen
