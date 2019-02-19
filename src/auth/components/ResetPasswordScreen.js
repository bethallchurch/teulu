import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Alert
} from 'react-native'
import { Icon } from 'react-native-elements'
import { Auth } from 'aws-amplify'
import Button from '@global/components/Button'
import TextInput from '@auth/components/TextInput'

class ResetPasswordScreen extends Component {
  state = {
    password: '', repeatPassword: '', authenticationCode: ''
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  async resetPassword () {
    const { username, password, authenticationCode } = this.state
    try {
      await Auth.forgotPasswordSubmit(username, authenticationCode, password)
      this.props.navigation.navigate('Login')
    } catch (error) {
      Alert.alert('Something went wrong!', message ? message : error)
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
          <KeyboardAvoidingView style={{ ...styles.container, flex: 1 }} behavior='padding' enabled>
            <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                <View style={styles.infoContainer}>
                  <Text style={styles.titleText}>Reset Password</Text>
                  <TextInput
                    placeholder='Password'
                    value={this.state.password}
                    returnKeyType='next'
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={value => this.onChangeText('password', value)}
                  />
                  <TextInput
                    placeholder='Repeat Password'
                    value={this.state.repeatPassword}
                    returnKeyType='next'
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={value => this.onChangeText('repeatPassword', value)}
                  />
                  <TextInput
                    placeholder='Verification Code'
                    value={this.state.authenticationCode}
                    returnKeyType='go'
                    autoCorrect={false}
                    keyboardType='numeric'
                    onChangeText={value => this.onChangeText('authenticationCode', value)}
                  />
                  <Button onPress={this.resetPassword}>Reset</Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f6',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    flex: 1
  },
  titleText: {
    fontFamily: 'OpenSans-Bold',
    textAlign: 'left',
    width: '100%',
    fontSize: 32,
    marginBottom: 32,
    color: '#555'
  }
})

export default ResetPasswordScreen
