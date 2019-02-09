import React, { Component } from 'react'
import { ListItem, Card } from 'react-native-elements'
import { contacts } from '@contacts/ContactService'

export default class ContactList extends Component {
  state = { contacts: [] }

  async componentDidMount () {
    try {
      const result = await contacts()
      this.setState({ contacts: result })
    } catch (error) {
      console.log('error getting contacts:', error)
    }
  }

  render () {
    return (
      <Card title='Contacts' containerStyle={{ paddingHorizontal: 0 }}>
        {this.state.contacts.map(({ id, name }) => (
          <ListItem key={id} title={name} />
        ))}
      </Card>
    )
  }
  
}