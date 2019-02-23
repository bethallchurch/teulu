import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { lightGrey, green } from '@global/styles'

const TabBarIcon = ({ name, focused }) => (
  <AntDesign name={name} size={24} color={focused ? green : lightGrey} />
)

export default TabBarIcon
