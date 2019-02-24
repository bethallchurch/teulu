import React, { Component } from 'react'
import { Text, Alert } from 'react-native'
import uuid from 'uuid/v4'
import { LOGIN } from '@navigation/routes'
import { signUp, resendSignUp, confirmSignUp } from '@auth/AuthService'
import Button from '@global/components/Button'
import TextInput from '@global/components/TextInput'
import PhoneInput from '@global/components/PhoneInput'
import Link, { LinkContainer } from '@global/components/Link'
import MinimalScreenBase from '@global/components/MinimalScreenBase'
import ComponentWithPhoneInput, { defaultDialCode } from '@global/components/ComponentWithPhoneInput'
import { titleStyle } from '@global/styles'

// TODO: check if user with phone number already exists

class RegisterScreen extends ComponentWithPhoneInput {
  constructor (props) {
    super(props)
    this.state = {
      username: `${Date.now().toString()}-${uuid()}`,
      dialCode: defaultDialCode,
      nationalNumber: '',
      password: '',
      repeatPassword: '',
      verificationCode: '',
      modalVisible: false,
      codeRequested: false
    }
  }

  requestCode = async () => {
    const { username, password, repeatPassword, nationalNumber, dialCode } = this.state
    try {
      if (password !== repeatPassword) throw Error('Passwords don\'t match.')
      await signUp({
        username,
        password,
        attributes: { phone_number: `${dialCode}${nationalNumber}` }
      })
      Alert.alert(
        'Verification Code Sent',
        'You\'ve have been sent a verification code via SMS.',
        [{
          text: 'OK',
          onPress: () => this.setState({ codeRequested: true })
        }]
      )
    } catch (error) {
      const { message } = error
      console.log('Error requesting register verification code:', error)
      Alert.alert('Something went wrong!', message ? message : error)
    }
  }

  resendCode = async () => {
    const { username } = this.state
    try {
      await resendSignUp({ username })
      Alert.alert('Verification Code Sent', 'You\'ll receive a new verification code via SMS.')
    } catch (error) {
      const { message } = error
      console.log('Error requesting new register verification code:', error)
      Alert.alert('Something went wrong!', message ? message : error)
    }
  }

  register = async () => {
    const { navigation: { navigate } } = this.props
    const { username, nationalNumber, dialCode, verificationCode } = this.state
    try {
      await confirmSignUp({ username, verificationCode })
      Alert.alert(
        'Registration Successful!',
        'You can now log in.',
        [{
          text: 'OK',
          onPress: () => navigate(LOGIN, { nationalNumber, dialCode })
        }]
      )
    } catch (error) {
      const { message } = error
      console.log('Error confirming user registration:', error)
      Alert.alert('Something went wrong!', message ? message : error)
    }
  }

  render () {
    const { navigation: { navigate } } = this.props
    const {
      modalVisible,
      dialCode,
      nationalNumber,
      verificationCode,
      password,
      repeatPassword,
      codeRequested
    } = this.state
    return (
      <MinimalScreenBase>
        <Text style={titleStyle.style}>Register</Text>
        <PhoneInput
          showModal={this.showModal}
          hideModal={this.hideModal}
          returnKeyType='next'
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
          returnKeyType='next'
          autoCorrect={false}
          secureTextEntry={true}
          ref='password'
          refName='password'
          onSubmitEditing={() => this.focusInput('repeatPassword')}
          onChangeText={value => this.onChangeText('password', value)}
        />
        <TextInput
          placeholder='Repeat Password'
          value={repeatPassword}
          returnKeyType={codeRequested ? 'next' : 'done'}
          autoCorrect={false}
          secureTextEntry={true}
          ref='repeatPassword'
          refName='repeatPassword'
          onSubmitEditing={() => codeRequested ? this.focusInput('verificationCode') : null}
          onChangeText={value => this.onChangeText('repeatPassword', value)}
        />
        {!codeRequested && <Button onPress={this.requestCode}>Register</Button>}
        {codeRequested && (
          <>
            <TextInput
              placeholder='Verification Code'
              value={verificationCode}
              returnKeyType='done'
              autoCorrect={false}
              keyboardType='numeric'
              ref='verificationCode'
              refName='verificationCode'
              onChangeText={value => this.onChangeText('verificationCode', value)}
            />
            <Button onPress={this.register}>Confirm Register</Button>
          </>
        )}
        <LinkContainer>
          {codeRequested && <Link onPress={this.resendCode}>Resend code</Link>}
        </LinkContainer>
      </MinimalScreenBase>
    )
  }
}

export default RegisterScreen
