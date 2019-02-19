import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Alert
} from 'react-native'
import { Icon } from 'react-native-elements'
import { Auth } from 'aws-amplify'
import Link, { LinkContainer } from '@global/components/Link'
import Button from '@global/components/Button'
import TextInput from '@auth/components/TextInput'

export default class LoginScreen extends Component {
  constructor (props) {
    super(props)
    const username = props.navigation.getParam('username') || ''
    this.state = { username, password: '' }
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  logIn = async () => {
    const { username, password } = this.state
    try {
      const user = await Auth.signIn(username, password)
      this.setState({ user })
      this.props.navigation.navigate('AuthLoading')
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
                <Text style={styles.titleText}>Log In</Text>
                <TextInput
                  placeholder='Username'
                  value={this.state.username}
                  returnKeyType='next'
                  keyboardType='email-address'
                  autoCorrect={false}
                  onChangeText={value => this.onChangeText('username', value)}
                />
                <TextInput
                  placeholder='Password'
                  value={this.state.password}
                  returnKeyType='go'
                  autoCorrect={false}
                  secureTextEntry={true}
                  onChangeText={value => this.onChangeText('password', value)}
                />
                <Button onPress={this.logIn}>Log In</Button>
                <LinkContainer>
                  <Link onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                    Forgot password?
                  </Link>
                  <Link onPress={() => this.props.navigation.navigate('Register')}>
                    Register
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
