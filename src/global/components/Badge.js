import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ViewPropTypes } from 'react-native'
import Text from '@global/components/Text'
import { colors, layout } from '@global/styles'

const Badge = ({ containerStyles, children }) => (
  <View style={[ styles.container, containerStyles ]}>
    <Text caption color={colors.primary} style={styles.text}>{children}</Text>
  </View>
)

Badge.propTypes = {
  containerStyles: ViewPropTypes.style,
  children: PropTypes.node.isRequired
}

Badge.defaultProps = {
  containerStyles: {}
}

const styles = StyleSheet.create({
  container: {
    borderRadius: layout.s1,
    borderColor: colors.primary,
    backgroundColor: 'transparent',
    paddingHorizontal: layout.s1,
    borderWidth: StyleSheet.hairlineWidth
  },
  text: {
    lineHeight: 15
  }
})

export default Badge
