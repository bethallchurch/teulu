import React, { Component } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { ActionButton } from '@global/components'
import { GroupAlbumList as AlbumList } from '@album/components/AlbumList'
import { CREATE_ALBUM } from '@navigation/routes'
import { colors } from '@global/styles'

class GroupScreen extends Component {
  get groupId () {
    return this.props.navigation.getParam('groupId')
  }

  navigateToCreateAlbum = () => this.props.navigation.navigate(CREATE_ALBUM, {
    groupId: this.groupId
  })

  render () {
    return (
      <SafeAreaView style={{ ...styles.container, backgroundColor: colors.primaryBackground }}>
        <AlbumList groupId={this.groupId} navigation={this.props.navigation} />
        <ActionButton onPress={this.navigateToCreateAlbum}>
          <MaterialIcons name='add-to-photos' color='#fff' size={32} />
        </ActionButton>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  }
})

export default GroupScreen
