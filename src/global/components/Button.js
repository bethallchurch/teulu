import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'
import { colors, layout } from '@global/styles'
import Text from '@global/components/Text'

const Button = ({ children, onPress, containerStyle }) => (
  <TouchableOpacity onPress={onPress} style={[ styles.container, styles.button, containerStyle ]}>
    <Text button color={colors.primaryBackground}>{children.toUpperCase()}</Text>
  </TouchableOpacity>
)

export const FullWidthButton = ({ title, onPress, rightIcon }) => (
  <ListItem
    title={<Text button color={colors.primaryBackground}>{title.toUpperCase()}</Text>}
    onPress={onPress}
    containerStyle={styles.container}
    rightIcon={rightIcon}
  />
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary
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
  containerStyle: PropTypes.objectOf(PropTypes.string)
}

Button.defaultProps = {
  containerStyle: {}
}

FullWidthButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  rightIcon: PropTypes.node
}

FullWidthButton.defaultProps = {
  rightIcon: null
}

export default Button
