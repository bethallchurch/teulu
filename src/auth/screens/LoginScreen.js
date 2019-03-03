import React from 'react'
import { Text, Alert } from 'react-native'
import { signIn } from '@auth/AuthService'
import Link, { LinkContainer } from '@global/components/Link'
import Button from '@global/components/Button'
import TextInput from '@global/components/TextInput'
import PhoneInput from '@global/components/PhoneInput'
import MinimalScreenBase from '@global/components/MinimalScreenBase'
import ComponentWithPhoneInput, { defaultDialCode } from '@global/components/ComponentWithPhoneInput'
import { AUTH_LOADING, FORGOT_PASSWORD } from '@navigation/routes'

import { titleStyle } from '@global/styles'

export default class LoginScreen extends ComponentWithPhoneInput {
  constructor (props) {
    super(props)
    const nationalNumber = props.navigation.getParam('nationalNumber') || ''
    const dialCode = props.navigation.getParam('dialCode') || defaultDialCode
    this.state = {
      nationalNumber,
      dialCode,
      password: '',
      modalVisible: false
    }
  }

  logIn = async () => {
    const { password } = this.state
    try {
      await signIn({ phoneNumber: this.phoneNumber, password })
      this.props.navigation.navigate(AUTH_LOADING)
    } catch (error) {
      const { message } = error
      console.log('Error logging in user:', error)
      Alert.alert('Something went wrong!', message || error)
    }
  }

  render () {
    const { navigation: { navigate } } = this.props
    const { dialCode, modalVisible, nationalNumber, password } = this.state
    return (
      <MinimalScreenBase>
        <Text style={titleStyle.style}>Log In</Text>
        <PhoneInput
          showModal={this.showModal}
          hideModal={this.hideModal}
          dialCode={dialCode}
          modalVisible={modalVisible}
          getCountry={this.getCountry}
          value={nationalNumber}
          onSubmitEditing={() => this.focusInput('password')}
          onChangeText={value => this.onChangeText('nationalNumber', value)}
        />
        <TextInput
          placeholder='Password'
          value={password}
          returnKeyType='done'
          autoCorrect={false}
          secureTextEntry
          ref='password'
          refName='password'
          onChangeText={value => this.onChangeText('password', value)}
        />
        <Button onPress={this.logIn}>Log In</Button>
        <LinkContainer>
          <Link onPress={() => navigate(FORGOT_PASSWORD, { dialCode, nationalNumber })}>Forgot password?</Link>
        </LinkContainer>
      </MinimalScreenBase>
    )
  }
}
