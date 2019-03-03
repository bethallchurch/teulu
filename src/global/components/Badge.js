import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import Text from '@global/components/Text'
import { colors, layout } from '@global/styles'

const Badge = ({ children }) => (
  <View style={styles.container}>
    <Text caption color={colors.primary} style={styles.text}>{children}</Text>
  </View>
)

Badge.propTypes = {
  children: PropTypes.node.isRequired
}

const styles = StyleSheet.create({
  container: {
    borderRadius: layout.s1,
    borderColor: colors.primary,
    backgroundColor: colors.secondaryBackground,
    paddingHorizontal: layout.s1,
    borderWidth: StyleSheet.hairlineWidth
  },
  text: {
    lineHeight: 15
  }
})

export default Badge
