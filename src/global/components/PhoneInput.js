import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { phoneInputStyle, copyStyle } from '@global/styles'
import TextInput from '@global/components/TextInput'
import InternationalPhoneDropdown from '@global/components/InternationalPhoneDropdown'

const PhoneInput = ({
  showModal,
  hideModal,
  onChangeText,
  dialCode,
  modalVisible,
  getCountry,
  returnKeyType = 'next',
  placeholder = 'Phone number',
  ...props
}) => (
  <View style={phoneInputStyle.container}>
    <TouchableOpacity onPress={showModal}>
      <View style={phoneInputStyle.dropdownContainer}>
        <Icon name='chevron-down' type='material-community' iconStyle={phoneInputStyle.icon} />
        <Text style={copyStyle.style}>{dialCode}</Text>
        <InternationalPhoneDropdown visible={modalVisible} getCountry={getCountry} hide={hideModal} />
      </View>
    </TouchableOpacity>
    <TextInput
      placeholder={placeholder}
      keyboardType='numeric'
      returnKeyType={returnKeyType}
      autoCorrect={false}
      containerStyle={phoneInputStyle.textInputContainer}
      onChangeText={value => onChangeText(value)}
      {...props}
    />
  </View>
)

export default PhoneInput
