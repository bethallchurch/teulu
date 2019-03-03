import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { GROUP_LIST } from '@navigation/routes'
import GroupList from '@group/components/GroupList'
import AlbumList from '@album/components/AlbumList'
import { Section } from '@global/components'
import { colors } from '@global/styles'

export default class HomeScreen extends Component {
  get sectionWidth () {
    return Dimensions.get('window').width - 30
  }

  render () {
    const { navigation } = this.props
    return (
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryBackground,
    flex: 1
  }
})
