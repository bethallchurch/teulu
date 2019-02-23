import React, { Component } from 'react'
import { View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { getContacts } from '@contacts/ContactService'

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
    return (
      <View>
        {this.state.contacts.map(({ id, name, username }) => (
          <ListItem
            key={id}
            title={name || username}
            rightIcon={{ name: selectedContacts.includes(id) ? 'check-box' : 'check-box-outline-blank' }}
            onPress={() => onPressContact(id)}
          />
        ))}
      </View>
    )
  }

}
