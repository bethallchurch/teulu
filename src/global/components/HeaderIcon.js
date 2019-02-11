import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

const HeaderIcon = ({ onPress, iconName }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.headerIcon}>
      <MaterialIcons name={iconName} size={22} />
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  headerIcon: {
    borderRadius: 100,
    backgroundColor: '#ddd',
    padding: 2,
    marginRight: 10
  }
})

export default HeaderIcon
