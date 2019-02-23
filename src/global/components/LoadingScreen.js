import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { offWhite } from '@global/styles'

const LoadingScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator size='large' color='#fff' />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: offWhite,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default LoadingScreen
