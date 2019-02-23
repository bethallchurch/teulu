import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  Modal,
  FlatList
} from 'react-native'
import { Icon } from 'react-native-elements'
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
          renderItem={({ item: { code, flag, dialCode, name } }) => (
            <TouchableWithoutFeedback onPress={() => getCountry(code)}>
              <View style={styles.countryStyle}>
                <View style={{ flexDirection: 'row', paddingVertical: 8 }}>
                  <Text style={styles.text}>{name}</Text>
                  <Text style={styles.dialCodeStyle}>{dialCode}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>)
          }
        />
      </View>
    </SafeAreaView>
  </Modal>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aa73b7',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#555'
  },
  dialCodeStyle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#aaa',
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
