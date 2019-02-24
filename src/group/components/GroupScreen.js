import React, { Component } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import ActionButton from '@global/components/ActionButton'
import AlbumList from '@album/components/AlbumList'
import { CREATE_ALBUM } from '@navigation/routes'
import { colors } from '@global/styles'

class GroupScreen extends Component {
  navigateToCreateAlbum = () => this.props.navigation.navigate(CREATE_ALBUM, {
    groupId: this.props.navigation.getParam('groupId')
  })

  render () {
    return (
      <SafeAreaView style={{ ...styles.container, backgroundColor: colors.primaryBackground }}>
        <AlbumList navigation={this.props.navigation} />
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
