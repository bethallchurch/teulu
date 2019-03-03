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

const ScreenBase = ({ children }) => (
  <SafeAreaView style={styles.container}>
    <StatusBar />
    <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
      <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
        <Content children={children} />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </SafeAreaView>
)

const Content = ({ children }) => (
  <View style={styles.container}>
    <View style={styles.infoContainer}>{children}</View>
  </View>
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
    padding: 32,
    flex: 1
  }
})

export default ScreenBase
