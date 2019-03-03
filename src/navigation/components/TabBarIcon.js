import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { colors, layout } from '@global/styles'

const TabBarIcon = ({ name, focused }) => (
  <AntDesign name={name} size={layout.s4} color={focused ? colors.primary : colors.textLight} />
)

export default TabBarIcon
