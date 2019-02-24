import React from 'react'
import { View, Text } from 'react-native'
import { copyStyle, f5 } from '@global/styles'
import { noContactsStyle } from '@contact/styles'

const NoContacts = () => (
  <View style={noContactsStyle.container}>
    <Text style={{ ...copyStyle.style, ...f5 }}>
      Contacts from your phone who have downloaded the app will automatically appear here.
    </Text>
  </View>
)

export default NoContacts
