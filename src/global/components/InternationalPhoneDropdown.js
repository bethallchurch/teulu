import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  Modal,
  FlatList
} from 'react-native'
import { Icon } from 'react-native-elements'
import Text from '@global/components/Text'
import { COUNTRY_CODES } from '@global/constants'

const InternationalPhoneDropdown = ({ visible, getCountry, hide }) => (
  <Modal
    animationType='slide'
    transparent={false}
    visible={visible}
    onRequestClose={hide}
  >
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={hide} style={{ marginVertical: 8, alignItems: 'flex-end', paddingHorizontal: 16 }}>
        <View style={{ backgroundColor: '#6FCEA1', width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
          <Icon name='close' color='#f6f7f6' />
        </View>
      </TouchableOpacity>
      <View style={{ flex: 7 }}>
        <FlatList
          data={COUNTRY_CODES}
          keyExtractor={(item, index) => index.toString()}
          renderItem={item => {
            return <ListItem item={item} getCountry={getCountry} />
          }}
        />
      </View>
    </SafeAreaView>
  </Modal>
)

const ListItem = ({ item, getCountry }) => {
  const { item: { code, dialCode, name } } = item
  return (
    <TouchableWithoutFeedback onPress={() => getCountry(code)}>
      <View style={styles.countryStyle}>
        <View style={{ flexDirection: 'row', paddingVertical: 8 }}>
          <Text bodyOne>{name}</Text>
          <Text bodyOne color='#aaa' style={styles.dialCodeStyle}>{dialCode}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aa73b7',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  dialCodeStyle: {
    marginLeft: 8
  },
  countryStyle: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f6f7f6'
  },
  closeButtonStyle: {
    flex: 1,
    alignItems: 'center'
  }
})

export default InternationalPhoneDropdown
