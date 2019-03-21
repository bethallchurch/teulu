import React from 'react'
import { Icon } from 'react-native-elements'
import { colors, layout } from '@global/styles'

const TabBarIcon = ({ name, focused, type = 'material' }) => (
  <Icon name={name} type={type} size={layout.s4} color={focused ? colors.textDefault : colors.textLight} />
)

export default TabBarIcon
