import React from 'react'
import { Alert, StyleSheet } from 'react-native'
import { USER_SETTINGS } from '@navigation/routes'
import { getAuthUser, updateUserAttributes, verifyCurrentUserAttributeSubmit } from '@auth/AuthService'
import { updateUser } from '@user/UserService'
import {
  ScreenBase,
  WithPhoneInput,
  defaultDialCode,
  PhoneInput,
  TextInput,
  Button,
  Text
} from '@global/components'
import { layout } from '@global/styles'

export default class ResetPhoneNumberScreen extends WithPhoneInput {
  constructor (props) {
    super(props)
    this.state = {
      newDialCode: defaultDialCode,
      newNationalNumber: '',
      verificationCode: '',
      codeRequested: false,
      modalVisible: false,
      user: {}
    }
  }

  requestCode = async () => {
    const { newDialCode, newNationalNumber } = this.state
    const phoneNumber = `${newDialCode}${newNationalNumber}`
    try {
      const user = await getAuthUser()
      this.setState({ user })
      await updateUserAttributes({ user, attributes: { phone_number: phoneNumber } })
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
      Alert.alert('Something went wrong!', message || error)
    }
  }

  resetPhoneNumber = async () => {
    const { user, newDialCode, newNationalNumber, verificationCode } = this.state
    const phoneNumber = `${newDialCode}${newNationalNumber}`
    try {
      await verifyCurrentUserAttributeSubmit({ attribute: phoneNumber, verificationCode })
      await updateUser({ id: user.username, phoneNumber })
      Alert.alert('Phone Number Changed!', 'Successfully updated phone number.', [{
        text: 'OK',
        onPress: () => this.props.navigation.navigate(USER_SETTINGS)
      }])
    } catch (error) {
      const { message } = error
      console.log('Error resetting phone number:', error)
      Alert.alert('Something went wrong!', message || error)
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
      <ScreenBase avoidKeyboard contentContainer>
        <Text h4 style={styles.title}>Reset Phone Number</Text>
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
        {!codeRequested && <Button onPress={this.requestCode}>Update</Button>}
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
            <Button onPress={this.resetPhoneNumber}>Confirm Update</Button>
          </>
        )}
      </ScreenBase>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    width: '100%',
    marginBottom: layout.s5
  }
})
