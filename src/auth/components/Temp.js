import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

export default class WelcomeScreen extends React.Component {
  handleRoute = async (destination) => {
    await this.props.navigation.navigate(destination)
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('Register')}
          style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('Login')}
          style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('ForgotPassword')}
          style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Forgot Password</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('ResetPassword')}
          style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('Verification')}
          style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Verification</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aa73b7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    padding: 20,
  },
  textStyle: {
    fontSize: 18,
    padding: 10
  }
})