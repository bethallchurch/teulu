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

class ResendCodeScreen extends Component {
  constructor (props) {
    super(props)
    const username = props.navigation.getParam('username') || ''
    this.state = { username }
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  resend = async () => {
    const { username } = this.state
    try {
      await Auth.resendSignUp(username)
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
                  <Text style={styles.titleText}>Request new verification code</Text>
                  <TextInput
                    placeholder='Username'
                    value={this.state.username}
                    returnKeyType='next'
                    keyboardType='email-address'
                    autoCorrect={false}
                    onChangeText={value => this.onChangeText('username', value)}
                  />
                  <Button onPress={this.resend}>Resend</Button>
                  <LinkContainer>
                    <Link onPress={() => this.props.navigation.navigate('Verification')}>
                      Verify code
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

export default ResendCodeScreen
