import React, { Fragment } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { linkStyles as styles } from '@global/styles'

export const LinkContainer = ({ children }) => (
  <View style={styles.container}>
    <Fragment>{children}</Fragment>
  </View>
)

const Link = ({ children, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.link}>{children}</Text>
  </TouchableOpacity>
)

export default Link
