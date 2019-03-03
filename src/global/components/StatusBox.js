import React from 'react'
import PropTypes from 'prop-types'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Text from '@global/components/Text'
import { colors, layout } from '@global/styles'

export const Error = ({ backgroundColor }) => (
  <View style={[ styles.container, backgroundColor ]}>
    <MaterialIcons name='warning' color={colors.textDefault} size={layout.s7} />
    <Text bodyOne>Something went wrong</Text>
  </View>
)

export const Loading = ({ backgroundColor }) => (
  <View style={[ styles.container, backgroundColor ]}>
    <ActivityIndicator size='large' color={colors.primary} />
  </View>
)

const propTypes = {
  backgroundColor: PropTypes.string
}

const defaultProps = {
  backgroundColor: colors.primaryBackground
}

Error.propTypes = propTypes
Error.defaultProps = defaultProps

Loading.propTypes = propTypes
Loading.defaultProps = defaultProps

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
})
