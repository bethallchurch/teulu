import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { bgLemon, merge } from '@styles'

const Main = () => (
  <View style={styles.container}>
    <MaterialCommunityIcons name='loading' size={32} />
  </View>
)

const styles = StyleSheet.create({
  container: merge({ flex: 1 }, bgLemon)
})

export default Main
