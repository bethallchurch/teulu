import React, { Component } from 'react'
import {
  AsyncStorage,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Alert
} from 'react-native'
import Amplify, { Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react-native'
import { createAppContainer } from 'react-navigation'
import { getOrCreateUser } from '@user/UserService'
import { UserContext } from '@global/context'
import Navigator from '@Navigator'

// class App extends Component {
//   state = { user: {} }
//
//   async componentDidMount () {
//     const user = await getOrCreateUser()
//     this.setState({ user })
//   }
//
//   render () {
//     return (
//       <UserContext.Provider value={this.state.user}>
//         <Navigator />
//       </UserContext.Provider>
//     )
//   }
// }

class App extends React.Component {
  signOutAlert = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [{
      text: 'Cancel',
      onPress: () => console.log('Canceled'),
      style: 'cancel'
    }, {
      text: 'OK',
      onPress: () => this.signOut()
    }], { cancelable: false })
  }

  signOut = async () => {
    try {
      await Auth.signOut()
      this.props.navigation.navigate('AuthLoading')
    } catch (error) {
      const { message } = error
      Alert.alert('Something went wrong!', message ? message : error)
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.signOut()}
          style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Sign out</Text>
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
    justifyContent: 'center'
  },
  buttonStyle: {
    padding: 20
  },
  textStyle: {
    fontSize: 18,
    padding: 10
  }
})

export default App
