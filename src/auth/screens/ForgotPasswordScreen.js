import React, { Component } from 'react'
import { StyleSheet, Text, Alert } from 'react-native'
import { LOGIN } from '@navigation/routes'
import { forgotPassword, forgotPasswordSubmit } from '@auth/AuthService'
import MinimalScreenBase from '@global/components/MinimalScreenBase'
import ComponentWithPhoneInput, { defaultDialCode } from '@global/components/ComponentWithPhoneInput'
import Link, { LinkContainer } from '@global/components/Link'
import TextInput from '@global/components/TextInput'
import PhoneInput from '@global/components/PhoneInput'
import Button from '@global/components/Button'

import { titleStyle } from '@global/styles'

export default class ForgotPasswordScreen extends ComponentWithPhoneInput {
  constructor (props) {
    super(props)
    const nationalNumber = props.navigation.getParam('nationalNumber') || ''
    const dialCode = props.navigation.getParam('dialCode') || defaultDialCode
    this.state = {
      nationalNumber,
      dialCode,
      verificationCode: '',
      newPassword: '',
      repeatNewPassword: '',
      modalVisible: false,
      codeRequested: false
    }
  }

  requestCode = async () => {
    try {
      await forgotPassword({ phoneNumber: this.phoneNumber })
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
      console.log('Error requesting forgot password authentication code:', error)
      Alert.alert('Something went wrong!', message ? message : error)
    }
  }

  resetPassword = async () => {
    const { navigation: { navigate } } = this.props
    const { dialCode, nationalNumber, newPassword, repeatNewPassword, verificationCode } = this.state
    try {
      if (newPassword !== repeatNewPassword) throw Error('Passwords don\'t match.')
      await forgotPasswordSubmit({ phoneNumber: this.phoneNumber, verificationCode, newPassword })
      Alert.alert(
        'Password Updated!',
        'Your password has been reset.',
        [{
          text: 'Go to login',
          onPress: () => navigate(LOGIN, { dialCode, nationalNumber })
        }, {
          text: 'Cancel',
          onPress: () => null
        }]
      )
    } catch (error) {
      const { message } = error
      Alert.alert('Something went wrong!', message ? message : error)
    }
  }

  render () {
    const { navigation: { navigate } } = this.props
    const {
      dialCode,
      modalVisible,
      nationalNumber,
      codeRequested,
      verificationCode,
      newPassword,
      repeatNewPassword
    } = this.state
    return (
      <MinimalScreenBase>
        <Text style={titleStyle.style}>Forgot Password?</Text>
        <Text style={styles.text}>We'll text you a verification code that you can use to reset it.</Text>
        <PhoneInput
          showModal={this.showModal}
          hideModal={this.hideModal}
          dialCode={dialCode}
          modalVisible={modalVisible}
          getCountry={this.getCountry}
          value={nationalNumber}
          returnKeyType={codeRequested ? 'next' : 'done'}
          onChangeText={value => this.onChangeText('nationalNumber', value)}
          onSubmitEditing={() => codeRequested ? this.focusInput('verificationCode') : null}
        />
        {!codeRequested && <Button onPress={this.requestCode}>Send Code</Button>}
        {codeRequested && (
          <>
            <TextInput
              placeholder='Verification Code'
              value={verificationCode}
              returnKeyType='next'
              autoCorrect={false}
              keyboardType='numeric'
              ref='verificationCode'
              refName='verificationCode'
              onSubmitEditing={() => this.focusInput('newPassword')}
              onChangeText={value => this.onChangeText('verificationCode', value)}
            />
            <TextInput
              placeholder='New Password'
              value={newPassword}
              returnKeyType='next'
              autoCorrect={false}
              secureTextEntry={true}
              ref='newPassword'
              refName='newPassword'
              onSubmitEditing={() => this.focusInput('repeatNewPassword')}
              onChangeText={value => this.onChangeText('newPassword', value)}
            />
            <TextInput
              placeholder='Repeat New Password'
              value={repeatNewPassword}
              returnKeyType='done'
              autoCorrect={false}
              secureTextEntry={true}
              ref='repeatNewPassword'
              refName='repeatNewPassword'
              onChangeText={value => this.onChangeText('repeatNewPassword', value)}
            />
            <Button onPress={this.resetPassword}>Reset Password</Button>
          </>
        )}
        <LinkContainer>
          <Link onPress={() => navigate(LOGIN, { dialCode, nationalNumber })}>Back to login</Link>
          {codeRequested && <Link onPress={this.requestCode}>Resend code</Link>}
          {!codeRequested && (
            <Link onPress={() => this.setState({ codeRequested: true })}>Already have a code?</Link>
          )}
        </LinkContainer>
      </MinimalScreenBase>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#555',
    marginBottom: 16
  }
})
