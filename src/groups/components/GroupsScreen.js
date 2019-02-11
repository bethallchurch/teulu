import React, { Component } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import ActionButton from '@global/components/ActionButton'
import GroupList from '@groups/components/GroupList'

class GroupsScreen extends Component {
  navigateToCreateGroup = () => this.props.navigation.navigate('CreateGroup')

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <GroupList navigation={this.props.navigation} />
        <ActionButton onPress={this.navigateToCreateGroup}>
          <MaterialIcons name='group-add' color='#fff' size={32} />
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

export default GroupsScreen
