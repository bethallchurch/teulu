import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors, w4 } from '@global/styles'
import { headerIconStyle } from '@navigation/styles'

const HeaderIcon = ({ onPress, iconName }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={headerIconStyle.style}>
      <MaterialIcons name={iconName} size={w4.width} color={colors.textDefault} />
    </View>
  </TouchableOpacity>
)

export default HeaderIcon
