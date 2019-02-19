import React from 'react'
import { textInputStyles, lightGrey } from '@global/styles'
import { Input } from 'react-native-elements'

const TextInput = ({
  value,
  placeholder = '',
  inputStyle = {},
  inputContainerStyle = {},
  containerStyle = {},
  keyboardType = 'default',
  returnKeyType = 'default',
  autoCapitalize = 'none',
  autoCorrect = true,
  secureTextEntry = false,
  onSubmitEditing = null,
  onChangeText = null,
  onFocus = null,
  onBlur = null
}) => (
  <Input
    placeholder={placeholder}
    inputStyle={{ ...textInputStyles.input, ...inputStyle }}
    inputContainerStyle={{ ...textInputStyles.inputInputContainer, ...inputContainerStyle }}
    containerStyle={{ ...textInputStyles.inputContainer, ...containerStyle }}
    placeholderTextColor={lightGrey}
    keyboardType={keyboardType}
    returnKeyType={returnKeyType}
    autoCapitalize={autoCapitalize}
    autoCorrect={autoCorrect}
    value={value}
    secureTextEntry={secureTextEntry}
    onSubmitEditing={onSubmitEditing}
    onChangeText={onChangeText}
    onFocus={onFocus}
    onBlur={onBlur}
  />
)

export default TextInput
