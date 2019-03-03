import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors, layout } from '@global/styles'

// TODO: need to wrap in TouchableOpacity?

const HeaderIcon = ({ onPress, iconName, icon = null }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      {icon}
      {!icon && <MaterialIcons name={iconName} size={layout.s4} color={colors.textDefault} />}
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    padding: layout.s1,
    marginRight: layout.s2
  }
})

HeaderIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
  iconName: PropTypes.string,
  icon: PropTypes.node
}

HeaderIcon.defaultProps = {
  iconName: '',
  icon: null
}

export default HeaderIcon
