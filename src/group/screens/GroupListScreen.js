import React, { Component } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { ActionButton } from '@global/components'
import GroupList from '@group/components/GroupList'
import { CREATE_GROUP } from '@navigation/routes'
import { colors } from '@global/styles'

export default class GroupListScreen extends Component {
  render () {
    const { navigation: { navigate } } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <GroupList navigation={this.props.navigation} />
        <ActionButton onPress={() => navigate(CREATE_GROUP)}>
          <MaterialIcons name='group-add' color='#fff' size={32} />
        </ActionButton>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.primaryBackground
  }
})
