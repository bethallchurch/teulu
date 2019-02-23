import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { ListItem } from 'react-native-elements'
import { getContacts } from '@contact/ContactService'
import { colors } from '@global/styles'

export default class SelectContactList extends Component {
  state = { contacts: [] }

  async componentDidMount () {
    try {
      const contacts = await getContacts()
      this.setState({ contacts })
    } catch (error) {
      console.log('Error getting contacts:', error)
    }
  }

  render () {
    const { selectedContacts, onPressContact } = this.props
    const { contacts } = this.state
    // TODO! contacts.length > 1 atm bc haven't filtered out current user
    return (
      <View style={{ backgroundColor: '#fff', marginBottom: 16 }}>
        {contacts.length > 1 ? contacts.map(({ id, name, username }) => (
          <ListItem
            key={id}
            title={name || username}
            rightIcon={{ name: selectedContacts.includes(id) ? 'check-box' : 'check-box-outline-blank' }}
            onPress={() => onPressContact(id)}
          />
        )) : <NoContacts />}
      </View>
    )
  }

}

const NoContacts = () => (
  <View style={{ padding: 8 }}>
    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 16, textAlign: 'center', marginBottom: 8, color: colors.textDefault }}>You haven't got any contacts yet!</Text>
    <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 14, color: colors.textLight }}>Contacts from your phone who have downloaded the app will automatically appear here.</Text>
  </View>
)
