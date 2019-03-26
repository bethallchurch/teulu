import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors, layout } from '@global/styles'

const HeaderIcon = ({ onPress, name, type = 'material', icon = null }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      {icon}
      {!icon && <Icon name={name} type={type} size={layout.s4} color={colors.textDefault} />}
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
  name: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.node
}

HeaderIcon.defaultProps = {
  name: '',
  type: 'material',
  icon: null
}

export default HeaderIcon
