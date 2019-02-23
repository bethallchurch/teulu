import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { colors, w4 } from '@global/styles'

const TabBarIcon = ({ name, focused }) => (
  <AntDesign name={name} size={w4.width} color={focused ? colors.primary : colors.textLight} />
)

export default TabBarIcon
