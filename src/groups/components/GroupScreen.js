import React, { Component } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { getGroup } from '@groups/GroupService'
import ActionButton from '@global/components/ActionButton'
import AlbumList from '@albums/components/AlbumList'

class GroupScreen extends Component {
  async componentDidMount () {
    const id = this.props.navigation.getParam('groupId')
    try {
      const result = await getGroup(id)
    } catch (error) {
      console.log('Error getting group', error)
    }
  }

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
