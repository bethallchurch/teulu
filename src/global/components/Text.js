import React from 'react'
import PropTypes from 'prop-types'
import { Text as RNText } from 'react-native'
import typography from '@global/styles/typography'
import { compact, withoutKeys, arrayToObject, difference, objectFilter } from '@global/helpers'

const validTextStyles = Object.keys(typography())

const textStylePropTypes = arrayToObject(validTextStyles, { setValue: () => PropTypes.bool })
const defaultTextStyleProps = arrayToObject(validTextStyles, { setValue: () => false })

const Text = ({ style, color, children, ...props }) => {
  const rnProps = withoutKeys(props, validTextStyles)
  const textStyleProps = withoutKeys(props, difference(Object.keys(props), validTextStyles))
  const textStyle = objectFilter(textStyleProps) || { 'bodyOne': true }
  if (Object.keys(textStyle).length > 1) {
    console.warn(
      `Only one of ${JSON.stringify(Object.keys(textStyle))} should be set on the @global Text component.`
    )
  }
  const styles = compact([ typography(style)[Object.keys(textStyle)[0]], (color ? { color } : null) ])
  return <RNText {...rnProps} style={styles}>{children}</RNText>
}

Text.propTypes = {
  style: RNText.propTypes.style,
  children: PropTypes.node.isRequired,
  ...textStylePropTypes
}

Text.defaultProps = {
  style: {},
  ...defaultTextStyleProps
}

export default Text
