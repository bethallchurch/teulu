import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { grey } from '@global/styles'

const HeaderIcon = ({ onPress, iconName }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.headerIcon}>
      <MaterialIcons name={iconName} size={22} color={grey} />
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  headerIcon: {
    borderRadius: 100,
    padding: 2,
    marginRight: 10
  }
})

export default HeaderIcon
