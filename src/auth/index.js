import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Amplify, { Auth } from 'aws-amplify'
import config from './aws-exports'
import { Input, Button } from 'react-native-elements'

Amplify.configure(config)

class App extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
    authenticationCode: '',
    step: 0
  }

  onChange = name => text => {
    this.setState({ [name]: text })
  }

  onChangeUsername = this.onChange('username')
  onChangeEmail = this.onChange('email')
  onChangePassword = this.onChange('password')
  onChangePhoneNumber = this.onChange('phoneNumber')
  onChangeAuthenticationCode = this.onChange('authenticationCode')

  signUp = async () => {
    const { username, password, email, phoneNumber } = this.state
    const attributes = { email, phone_number: phoneNumber }
    try {
      await Auth.signUp({ username, password, attributes })
      console.log('Successful sign up!')
      this.setState({ step: 1 })
    } catch (error) {
      console.log('Error signing up:', error)
    }
  }

  confirmSignUp = async () => {
    const { username, authenticationCode } = this.state
    try {
      await Auth.confirmSignUp(username, authenticationCode)
      console.log('Successful confirm sign up!')
    } catch (error) {
      console.log('Error confirming sign up:', error)
    }
  }
  
  render () {
    return (
      <View>
        {this.state.step === 0 && (
          <View>
            <Input onChangeText={this.onChangeUsername} placeholder='Username' autoComplete='username' textContentType='username' />
            <Input onChangeText={this.onChangePassword} placeholder='Password' autoComplete='password' textContentType='password' secureTextEntry />
            <Input onChangeText={this.onChangeEmail} placeholder='Email' autoComplete='email' textContentType='emailAddress' />
            <Input onChangeText={this.onChangePhoneNumber} placeholder='Phone Number' autoComplete='tel' textContentType='telephoneNumber' />
            <Button onPress={this.signUp} title='Sign Up' />
          </View>
        )}
        {this.state.step === 1 && (
          <View>
            <Input onChangeText={this.onChangeUsername} placeholder='Username' autoComplete='username' textContentType='username' />
            <Input onChangeText={this.onChangeAuthenticationCode} placeholder='Authentication Code' keyboardType='numeric' />
            <Button onPress={this.confirmSignUp} title='Confirm Sign Up' />
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({})

export default App
