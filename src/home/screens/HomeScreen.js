import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { GROUP_LIST } from '@navigation/routes'
import GroupList from '@group/components/GroupList'
import Section from '@global/components/Section'
import { colors } from '@global/styles'
import { homeScreenStyle } from '@home/styles'

export default class HomeScreen extends Component {
  render () {
    const { navigation } = this.props
    return (
      <SafeAreaView style={homeScreenStyle.container}>
        <Section
          title='Groups'
          onPressTitle={() => navigation.navigate(GROUP_LIST)}
          listComponent={<GroupList compact navigation={navigation} />}
        />
      </SafeAreaView>
    )
  }
}
