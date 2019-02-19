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
import Button from '@global/components/Button'
import TextInput from '@auth/components/TextInput'
import Link, { LinkContainer } from '@global/components/Link'

class VerificationScreen extends Component {
  constructor (props) {
    super(props)
    const username = props.navigation.getParam('username') || ''
    this.state = { username, authenticationCode: '' }
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  confirm = async () => {
    const { username, authenticationCode } = this.state
    console.log('Username:', username, 'AuthCode:', authenticationCode)
    try {
      await Auth.confirmSignUp(username, authenticationCode)
      this.props.navigation.navigate('Login', { username })
    } catch (error) {
      const { message } = error
      Alert.alert('Something went wrong!', message ? message : error)
    }
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
          <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
            <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                <View style={styles.infoContainer}>
                  <Text style={styles.titleText}>Enter verification code</Text>
                  <TextInput
                    placeholder='Username'
                    value={this.state.username}
                    returnKeyType='next'
                    keyboardType='email-address'
                    autoCorrect={false}
                    onChangeText={value => this.onChangeText('username', value)}
                  />
                  <TextInput
                    placeholder='Verification Code'
                    value={this.state.authenticationCode}
                    returnKeyType='done'
                    autoCorrect={false}
                    keyboardType='numeric'
                    onChangeText={value => this.onChangeText('authenticationCode', value)}
                  />
                  <Button onPress={this.confirm}>Confirm</Button>
                  <LinkContainer>
                  <Link onPress={this.resend}>
                    Resend code
                  </Link>
                    <Link onPress={() => this.props.navigation.navigate('Login')}>
                      Login
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

export default VerificationScreen
