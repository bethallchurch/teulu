import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import { getAuthUser } from '@user/UserService'

export default class Profile extends Component {
  static navigationOptions = { title: 'Profile' }
  state = { username: '', phoneNumber: '', email: '' }

  async componentDidMount () {
    try {
      const user = await getAuthUser()
      this.setState({
        username: user.username, phoneNumber: user.attributes.phone_number, email: user.attributes.email
      })
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    return (
      <SafeAreaView>
        <Card title='My Details' containerStyle={{ paddingHorizontal: 0 }}>
          <ListItem title={this.state.username} leftIcon={{ name: 'person-outline' }} />
          <ListItem title={this.state.email} leftIcon={{ name: 'mail-outline' }} />
          <ListItem title={this.state.phoneNumber} leftIcon={{ name: 'phone' }} />
        </Card>
        <Button title='Sign Out' buttonStyle={{ backgroundColor: '#000' }} containerStyle={{ margin: 15 }} />
      </SafeAreaView>
    )
  }
}
