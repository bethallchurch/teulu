import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { buttonStyles } from '@global/styles'

const Button = ({ children, onPress }) => (
  <TouchableOpacity onPress={onPress} style={buttonStyles.container}>
    <Text style={buttonStyles.text}>{children}</Text>
  </TouchableOpacity>
)

export default Button
