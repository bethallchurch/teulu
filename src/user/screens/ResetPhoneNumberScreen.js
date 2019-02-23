import React, { Component } from 'react'
import { Alert } from 'react-native'
import { LOGIN } from '@navigation/routes'
import { getAuthUser, updateUserAttributes, verifyCurrentUserAttributeSubmit } from '@auth/AuthService'
import { updateUser } from '@user/UserService'
import MinimalScreenBase from '@global/components/MinimalScreenBase'
import ComponentWithPhoneInput, { defaultDialCode } from '@global/components/ComponentWithPhoneInput'
import PhoneInput from '@global/components/PhoneInput'
import TextInput from '@global/components/TextInput'
import Button from '@global/components/Button'

export default class ResetPhoneNumberScreen extends ComponentWithPhoneInput {
  constructor (props) {
    super(props)
    this.state = {
      newDialCode: defaultDialCode,
      newNationalNumber: '',
      verificationCode: '',
      codeRequested: false,
      modalVisible: false
    }
  }
  
  requestCode = async () => {
    const { newDialCode, newNationalNumber } = this.state
    const phoneNumber = `${newDialCode}${newNationalNumber}`
    try {
      const user = await getAuthUser()
      await updateUserAttributes({ user, attributes: { phone_number: phoneNumber }})
      Alert.alert(
        'Verification Code Sent',
        'A verification code has been sent via SMS to your new number.',
        [{
          text: 'OK',
          onPress: () => this.setState({ codeRequested: true })
        }]
      )
    } catch (error) {
      const { message } = error
      console.log('Error requesting update phone number verification code:', error)
      Alert.alert('Something went wrong!', message ? message : error)
    }
  }

  resetPhoneNumber = async () => {
    const { newDialCode, newNationalNumber, verificationCode } = this.state
    const phoneNumber = `${newDialCode}${newNationalNumber}`
    try {
      await verifyCurrentUserAttributeSubmit({ attribute: phoneNumber, verificationCode })
      await updateUser({ id: user.username, phoneNumber })
      Alert.alert('Phone Number Changed!', 'Successfully updated phone number.', [{
        text: 'OK',
        onPress: () => this.props.navigation.navigate(ACCOUNT)
      }])
    } catch (error) {
      const { message } = error
      console.log('Error resetting phone number:', error)
      Alert.alert('Something went wrong!', message ? message : error)
    }
  }

  render () {
    const {
      codeRequested,
      newDialCode,
      newNationalNumber,
      modalVisible,
      verificationCode
    } = this.state
    return (
      <MinimalScreenBase>
        <PhoneInput
          showModal={this.showModal}
          hideModal={this.hideModal}
          returnKeyType={codeRequested ? 'next' : 'done'}
          dialCode={newDialCode}
          modalVisible={modalVisible}
          getCountry={this.getCountry}
          value={newNationalNumber}
          onSubmitEditing={() => codeRequested ? this.focusInput('verificationCode') : null}
          onChangeText={value => this.onChangeText('newNationalNumber', value)}
        />
        {!codeRequested && <Button onPress={this.requestCode}>Request Code</Button>}
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
            <Button onPress={this.resetPhoneNumber}>Verify Update</Button>
          </>
        )}
      </MinimalScreenBase>
    )
  }
}
