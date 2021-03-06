import React from 'react'
import { Alert, StyleSheet } from 'react-native'
import { USER_SETTINGS } from '@navigation/routes'
import { getAuthUser, changePassword } from '@auth/AuthService'
import { WithInputs, ScreenBase, TextInput, Button, Text } from '@global/components'
import { layout } from '@global/styles'

export default class ResetPasswordScreen extends WithInputs {
  state = { user: {}, oldPassword: '', newPassword: '', repeatNewPassword: '' }

  resetPassword = async () => {
    const { oldPassword, newPassword, repeatNewPassword } = this.state
    try {
      if (newPassword !== repeatNewPassword) throw Error('Passwords don\'t match.')
      const user = await getAuthUser()
      await changePassword({ user, oldPassword, newPassword })
      Alert.alert('Password Changed!', 'Successfully updated password.', [{
        text: 'OK',
        onPress: () => this.props.navigation.navigate(USER_SETTINGS)
      }])
    } catch (error) {
      const { message } = error
      console.log('Error resetting password:', error)
      Alert.alert('Something went wrong!', message || error)
    }
  }

  render () {
    const { oldPassword, newPassword, repeatNewPassword } = this.state
    return (
      <ScreenBase avoidKeyboard contentContainer>
        <Text h4 style={styles.title}>Reset Password</Text>
        <TextInput
          placeholder='Old Password'
          value={oldPassword}
          returnKeyType='next'
          autoCorrect={false}
          secureTextEntry
          onSubmitEditing={() => this.focusInput('newPassword')}
          onChangeText={value => this.onChangeText('oldPassword', value)}
        />
        <TextInput
          placeholder='New Password'
          value={newPassword}
          returnKeyType='next'
          autoCorrect={false}
          secureTextEntry
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
          secureTextEntry
          ref='repeatNewPassword'
          refName='repeatNewPassword'
          onChangeText={value => this.onChangeText('repeatNewPassword', value)}
        />
        <Button onPress={this.resetPassword}>Reset Password</Button>
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
