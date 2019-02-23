import React from 'react'
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native'

const AuthScreenBase = ({ children }) => (
  <SafeAreaView style={styles.container}>
    <StatusBar />
    <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
      <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.infoContainer}>{children}</View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </SafeAreaView>
)

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
  }
})

export default AuthScreenBase
