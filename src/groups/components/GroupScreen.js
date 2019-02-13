import React, { Component } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import ActionButton from '@global/components/ActionButton'
import AlbumList from '@albums/components/AlbumList'

class GroupScreen extends Component {
  navigateToCreateAlbum = () => this.props.navigation.navigate('CreateAlbum', {
    groupId: this.props.navigation.getParam('groupId')
  })

  render () {
    return (
      <SafeAreaView style={styles.container}>
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
