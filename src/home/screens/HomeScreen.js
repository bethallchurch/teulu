import React, { Component } from 'react'
import { StyleSheet, Dimensions, ScrollView } from 'react-native'
import { GROUP_LIST } from '@navigation/routes'
import GroupList from '@group/components/GroupList'
import AlbumList from '@album/components/AlbumList'
import { ScreenBase, Section } from '@global/components'

export default class HomeScreen extends Component {
  get sectionWidth () {
    return Dimensions.get('window').width - 30
  }

  render () {
    const { navigation } = this.props
    return (
      <ScreenBase>
        <ScrollView>
          <Section
            title='Groups'
            onPressTitle={() => navigation.navigate(GROUP_LIST)}
            listComponent={<GroupList compact navigation={navigation} />}
          />
          <Section
            title='Albums'
            onPressTitle={() => null}
            listComponent={(
              <AlbumList
                gutterWidth={StyleSheet.hairlineWidth}
                containerPadding={0}
                navigation={navigation}
                containerWidth={this.sectionWidth}
                limit={6}
                numColumns={3}
              />
            )}
          />
        </ScrollView>
      </ScreenBase>
    )
  }
}
