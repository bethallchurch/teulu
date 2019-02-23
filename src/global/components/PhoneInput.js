import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { phoneInputStyles } from '@global/styles'
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
  <View style={phoneInputStyles.container}>
    <TouchableOpacity onPress={showModal}>
      <View style={phoneInputStyles.dropdownContainer}>
        <Icon name='chevron-down' type='material-community' iconStyle={phoneInputStyles.icon} />
        <Text style={phoneInputStyles.text}>{dialCode}</Text>
        <InternationalPhoneDropdown visible={modalVisible} getCountry={getCountry} hide={hideModal} />
      </View>
    </TouchableOpacity>
    <TextInput
      placeholder={placeholder}
      keyboardType='numeric'
      returnKeyType={returnKeyType}
      autoCorrect={false}
      containerStyle={phoneInputStyles.textInputContainer}
      onChangeText={value => onChangeText(value)}
      {...props}
    />
  </View>
)

export default PhoneInput
