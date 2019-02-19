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
import Button from '@global/components/Button'
import TextInput from '@auth/components/TextInput'
import Link, { LinkContainer } from '@global/components/Link'

export default class ForgotPasswordScreen extends Component {
  state = { username: '' }

  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  async requestCode () {
    const { username } = this.state
    try {
      const result = await Auth.forgotPassword(username)
      console.log('SENT:', result)
    } catch (error) {
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
                  <Text style={styles.titleText}>Forgot Password?</Text>
                  <Text style={styles.text}>We'll text you instructions on how to reset it.</Text>
                  <TextInput
                    placeholder='Username'
                    value={this.state.username}
                    returnKeyType='next'
                    keyboardType='email-address'
                    autoCorrect={false}
                    onChangeText={value => this.onChangeText('username', value)}
                  />
                  <Button onPress={this.sendCode}>Send Code</Button>
                  <LinkContainer>
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
  },
  text: {
    fontFamily: 'OpenSans',
    fontSize: 16,
    color: '#555',
    marginBottom: 16
  }
})
