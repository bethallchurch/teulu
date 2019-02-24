import React from 'react'
import { View, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { errorStyle, copyStyle, colors, s5 } from '@global/styles'

const Error = ({ backgroundColor = colors.primaryBackground }) => (
  <View style={{ ...errorStyle.container, backgroundColor }}>
    <MaterialIcons name='warning' color={colors.textDefault} size={s5} />
    <Text style={copyStyle.regular}>Something went wrong</Text>
  </View>
)

export default Error
