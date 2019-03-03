import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
import { colors, layout, typography } from '@global/styles'

export default class TextInput extends Component {
  render () {
    const {
      placeholder = '',
      inputStyle = {},
      inputContainerStyle = {},
      containerStyle = {},
      refName = '',
      ...props
    } = this.props
    return (
      <Input
        placeholder={placeholder}
        inputStyle={[ styles.input, inputStyle ]}
        inputContainerStyle={[ styles.inputInputContainer, inputContainerStyle ]}
        containerStyle={[ styles.inputContainer, containerStyle ]}
        ref={refName}
        textInputRef={refName}
        placeholderTextColor={colors.textLight}
        {...props}
      />
    )
  }
}

const styles = StyleSheet.create({
  input: typography.bodyOne,
  inputContainer: {
    paddingHorizontal: 0,
    marginBottom: layout.s3
  },
  inputInputContainer: {
    borderBottomColor: colors.textLight
  }
})
