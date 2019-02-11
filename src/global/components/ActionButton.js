import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'

const ActionButton = ({ onPress, children }) => (
  <TouchableOpacity style={styles.actionButtonContainer} onPress={onPress}>
    <View style={styles.actionButton}>
      {children}
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  actionButtonContainer: {
    position: 'absolute',
    right: 30,
    bottom: 40
  },
  actionButton: {
    borderRadius: 100,
    backgroundColor: '#000',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ActionButton
