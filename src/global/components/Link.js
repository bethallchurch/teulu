import React, { Fragment } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import Text from '@global/components/Text'
import { layout, colors } from '@global/styles'

export const LinkContainer = ({ children }) => (
  <View style={styles.container}>
    <Fragment>{children}</Fragment>
  </View>
)

const Link = ({ children, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text bodyTwo style={styles.link}>{children}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    marginTop: layout.s2
  },
  link: {
    color: colors.secondary,
    paddingVertical: layout.s2
  }
})

export default Link
