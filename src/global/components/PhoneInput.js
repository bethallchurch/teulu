import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import TextInput from '@global/components/TextInput'
import Text from '@global/components/Text'
import InternationalPhoneDropdown from '@global/components/InternationalPhoneDropdown'
import { layout, colors } from '@global/styles'

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
  <View style={styles.container}>
    <TouchableOpacity onPress={showModal}>
      <View style={styles.dropdownContainer}>
        <Icon name='chevron-down' type='material-community' iconStyle={styles.icon} />
        <Text bodyOne>{dialCode}</Text>
        <InternationalPhoneDropdown visible={modalVisible} getCountry={getCountry} hide={hideModal} />
      </View>
    </TouchableOpacity>
    <TextInput
      placeholder={placeholder}
      keyboardType='numeric'
      returnKeyType={returnKeyType}
      autoCorrect={false}
      containerStyle={styles.textInputContainer}
      onChangeText={value => onChangeText(value)}
      {...props}
    />
  </View>
)

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%'
  },
  icon: {
    color: colors.textDefault,
    paddingTop: 2
  },
  textInputContainer: {
    flex: 1
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: colors.textLight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: layout.s1,
    paddingRight: layout.s2,
    paddingTop: 6,
    paddingBottom: 7,
    marginRight: layout.s2
  }
})

export default PhoneInput
