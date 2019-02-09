import React, { Component } from 'react'
import { View, TextInput } from 'react-native'
import { Card, ListItem } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import { getAuthUser } from '@user/UserService'
import ContactList from '@contacts/components/ContactList'

export default class Profile extends Component {
  state = { username: '', phoneNumber: '', email: '' }

  async componentDidMount () {
    try {
      const result = await getUser()
      this.setState({
        username: result.username, phoneNumber: result.attributes.phone_number, email: result.attributes.email
      })
    } catch (error) {
      console.log(error)
    }
    
  }

  render () {
    
    return (
      <View>
        <Card title='My Details' containerStyle={{ paddingHorizontal: 0 }}>
          <ListItem title={this.state.username} leftIcon={{ name: 'person' }} />
          <ListItem title={this.state.email} leftIcon={{ name: 'email' }} />
          <ListItem title={this.state.phoneNumber} leftIcon={{ name: 'phone' }} />
        </Card>
        <ContactList />
      </View>
    )
  }
}
