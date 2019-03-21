import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, StyleSheet, ViewPropTypes, ActivityIndicator } from 'react-native'
import { ListItem } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import Text from '@global/components/Text'
import { colors, layout } from '@global/styles'

const Button = ({ children, onPress, containerStyle }) => (
  <TouchableOpacity onPress={onPress} style={styles.buttonTouchable}>
    <View style={[ styles.container, styles.button, containerStyle ]}>
      <Text button color={colors.primaryBackground}>{children.toUpperCase()}</Text>
    </View>
  </TouchableOpacity>
)

export const FullWidthButton = ({ title, onPress, rightIcon, loading, error, containerStyle, invert }) => (
  <ListItem
    title={<Text button color={invert ? colors.primary : colors.secondaryBackground}>{title.toUpperCase()}</Text>}
    onPress={loading ? null : onPress}
    containerStyle={[
      { backgroundColor: invert ? colors.secondaryBackground : colors.primary },
      (loading ? styles.containerLoading : {}),
      (error ? styles.containerError : {}),
      containerStyle
    ]}
    rightIcon={<RightIcon component={rightIcon} {...{ loading, error }} />}
  />
)

const RightIcon = ({ error, loading, component }) => {
  if (error) return <MaterialIcons name='warning' size={layout.s4} color={colors.primaryBackground} />
  if (loading) return <ActivityIndicator color={colors.primaryBackground} />
  return component
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary
  },
  containerLoading: {
    backgroundColor: colors.textLight
  },
  containerError: {
    backgroundColor: colors.danger
  },
  buttonTouchable: {
    width: '100%'
  },
  button: {
    alignItems: 'center',
    padding: layout.s3,
    width: '100%'
  }
})

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  containerStyle: ViewPropTypes.style
}

Button.defaultProps = {
  containerStyle: {}
}

FullWidthButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  rightIcon: PropTypes.node,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
  invert: PropTypes.bool
}

FullWidthButton.defaultProps = {
  rightIcon: null,
  loading: false,
  error: false,
  containerStyle: {},
  invert: false
}

export default Button
