import React from 'react'
import PropTypes from 'prop-types'
import { Text } from '@global/components'
import { layout } from '@global/styles'

const Title = ({ children }) => (
  <Text h4 style={{ width: '100%', marginBottom: layout.s5 }}>{children}</Text>
)

Title.propTypes = {
  children: PropTypes.node.isRequired
}

export default Title
