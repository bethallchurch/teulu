import React, { Component } from 'react'
import { textInputStyles, lightGrey } from '@global/styles'
import { Input } from 'react-native-elements'

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
        inputStyle={{ ...textInputStyles.input, ...inputStyle }}
        inputContainerStyle={{ ...textInputStyles.inputInputContainer, ...inputContainerStyle }}
        containerStyle={{ ...textInputStyles.inputContainer, ...containerStyle }}
        ref={refName}
        textInputRef={refName}
        placeholderTextColor={lightGrey}
        {...props}
      />
    )
  }
}
