import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { phoneInputStyles } from '@global/styles'
import TextInput from '@auth/components/TextInput'
import InternationalPhoneDropdown from '@auth/components/InternationalPhoneDropdown'

const PhoneInput = ({
  value,
  showModal,
  hideModal,
  onChangeText,
  dialCode,
  modalVisible,
  getCountry
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
      placeholder='Phone number'
      value={value}
      keyboardType='numeric'
      returnKeyType='next'
      autoCorrect={false}
      containerStyle={phoneInputStyles.textInputContainer}
      onChangeText={value => onChangeText('phoneNumber', value)}
    />
  </View>
)

export default PhoneInput
