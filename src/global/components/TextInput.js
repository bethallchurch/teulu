import React, { Component } from 'react'
import { textInputStyle, colors } from '@global/styles'
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
        inputStyle={{ ...textInputStyle.input, ...inputStyle }}
        inputContainerStyle={{ ...textInputStyle.inputInputContainer, ...inputContainerStyle }}
        containerStyle={{ ...textInputStyle.inputContainer, ...containerStyle }}
        ref={refName}
        textInputRef={refName}
        placeholderTextColor={colors.textLight}
        {...props}
      />
    )
  }
}
