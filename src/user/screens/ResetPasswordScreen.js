import React, { Component } from 'react'
import { SafeAreaView, Text, Alert } from 'react-native'
import { ACCOUNT } from '@navigation/routes'
import { getAuthUser, changePassword } from '@auth/AuthService'
import ComponentWithInputs from '@global/components/ComponentWithInputs'
import MinimalScreenBase from '@global/components/MinimalScreenBase'
import TextInput from '@global/components/TextInput'
import Button from '@global/components/Button'

export default class ResetPasswordScreen extends ComponentWithInputs {
  state = { user: {}, oldPassword: '', newPassword: '', repeatNewPassword: '' }

  resetPassword = async () => {
    const { oldPassword, newPassword, repeatNewPassword } = this.state
    try {
      if (newPassword !== repeatNewPassword) throw Error('Passwords don\'t match.')
      const user = await getAuthUser()
      await changePassword({ user, oldPassword, newPassword })
      Alert.alert('Password Changed!', 'Successfully updated password.', [{
        text: 'OK',
        onPress: () => this.props.navigation.navigate(ACCOUNT)
      }])
    } catch (error) {
      const { message } = error
      console.log('Error resetting password:', error)
      Alert.alert('Something went wrong!', message ? message : error)
    }
  }

  render () {
    const { oldPassword, newPassword, repeatNewPassword } = this.state
    return (
      <MinimalScreenBase>
        <TextInput
          placeholder='Old Password'
          value={oldPassword}
          returnKeyType='next'
          autoCorrect={false}
          secureTextEntry={true}
          onSubmitEditing={() => this.focusInput('newPassword')}
          onChangeText={value => this.onChangeText('oldPassword', value)}
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
      </MinimalScreenBase>
    )
  }
}
