import React from 'react'
import { ListItem } from 'react-native-elements'
import { copyStyle } from '@global/styles'
import { noContactsStyle } from '@contact/styles'

const NoContacts = ({
  onEmptyMessage = 'No results.'
}) => (
  <ListItem
    title={onEmptyMessage}
    titleStyle={copyStyle.regular}
    containerStyle={noContactsStyle.container}
  />
)

export default NoContacts
