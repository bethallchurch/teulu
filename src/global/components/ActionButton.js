import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { colors } from '@global/styles'

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
    backgroundColor: colors.primary,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ActionButton
