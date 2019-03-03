import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  ViewPropTypes
} from 'react-native'
import { colors, layout } from '@global/styles'

const ScreenBase = ({ avoidKeyboard, contentContainer, style, keyboardAvoidingViewProps, children }) => (
  <SafeAreaView style={[ styles.container, style ]}>
    <StatusBar barStyle='light-content' />
    <AvoidKeyboard props={keyboardAvoidingViewProps} avoid={avoidKeyboard}>
      <Content container={contentContainer} children={children} />
    </AvoidKeyboard>
  </SafeAreaView>
)

const AvoidKeyboard = ({ avoid, props, children }) => avoid ? (
  <KeyboardAvoidingView style={styles.container} behavior='padding' enabled {...props}>
    <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
      {children}
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
) : <>{children}</>

const Content = ({ container, children }) => container ? (
  <View style={styles.container}>
    <View style={styles.contentContainer}>{children}</View>
  </View>
) : <>{children}</>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.s5,
    flex: 1
  }
})

ScreenBase.propTypes = {
  avoidKeyboard: PropTypes.bool,
  contentContainer: PropTypes.bool,
  style: ViewPropTypes.style,
  keyboardAvoidingViewProps: ViewPropTypes.style,
  children: PropTypes.node.isRequired
}

ScreenBase.defaultTypes = {
  avoidKeyboard: false,
  contentContainer: false,
  style: {},
  keyboardAvoidingViewProps: {}
}


export default ScreenBase
