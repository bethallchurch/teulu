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
import { Auth } from 'aws-amplify'
import { Icon } from 'react-native-elements'
import { COUNTRY_CODES } from '@global/constants'
import Button from '@global/components/Button'
import TextInput from '@auth/components/TextInput'
import PhoneInput from '@auth/components/PhoneInput'
import Link, { LinkContainer } from '@global/components/Link'

const defaultDialCode = COUNTRY_CODES.find(({ code }) => code === 'GB').dialCode

class RegisterScreen extends Component {
  state = {
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    repeatPassword: '',
    dialCode: defaultDialCode,
    modalVisible: false
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  showModal = () => {
    this.setState({ modalVisible: true })
  }

  hideModal = () => {
    this.setState({ modalVisible: false })
  }

  getCountry = countryCode => {
    const { dialCode } = COUNTRY_CODES.find(({ code }) => code === countryCode)
    this.setState({ dialCode })
    this.hideModal()
  }

  register = async () => {
    const { username, password, email, phoneNumber, dialCode } = this.state
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email, phone_number: `${dialCode}${phoneNumber}` }
      })
      this.props.navigation.navigate('Verification', { username })
    } catch (error) {
      const { message } = error
      Alert.alert('Something went wrong!', message ? message : error)
    }
  }

  render () {
    const { fadeOut, fadeIn, isHidden, dialCode } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
          <KeyboardAvoidingView style={{ ...styles.container, flex: 1 }} behavior='padding' enabled>
            <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                <View style={styles.infoContainer}>
                  <Text style={styles.titleText}>Register</Text>
                  <TextInput
                    placeholder='Username'
                    value={this.state.username}
                    returnKeyType='next'
                    keyboardType='email-address'
                    autoCorrect={false}
                    onChangeText={value => this.onChangeText('username', value)}
                  />
                  <TextInput
                    placeholder='Email'
                    value={this.state.email}
                    returnKeyType='next'
                    keyboardType='email-address'
                    autoCorrect={false}
                    onChangeText={value => this.onChangeText('email', value)}
                  />
                  <PhoneInput
                    showModal={this.showModal}
                    hideModal={this.hideModal}
                    onChangeText={this.onChangeText}
                    dialCode={dialCode}
                    modalVisible={this.state.modalVisible}
                    getCountry={this.getCountry}
                    value={this.state.phoneNumber}
                  />
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
                    returnKeyType='go'
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={value => this.onChangeText('repeatPassword', value)}
                  />
                  <Button onPress={this.register}>Register</Button>
                  <LinkContainer>
                    <Link onPress={() => this.props.navigation.navigate('Login')}>
                      Login
                    </Link>
                    <Link onPress={() => this.props.navigation.navigate('Verification')}>
                      Verify a code
                    </Link>
                  </LinkContainer>
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

export default RegisterScreen
