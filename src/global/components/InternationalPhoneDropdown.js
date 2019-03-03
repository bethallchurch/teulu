import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  FlatList
} from 'react-native'
import { Icon } from 'react-native-elements'
import ScreenBase from '@global/components/ScreenBase'
import Text from '@global/components/Text'
import { COUNTRY_CODES } from '@global/constants'
import { colors, layout } from '@global/styles'

const InternationalPhoneDropdown = ({ visible, getCountry, hide }) => (
  <Modal
    animationType='slide'
    transparent={false}
    visible={visible}
    onRequestClose={hide}
  >
    <ScreenBase>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={hide}>
          <Icon name='close' color={colors.textDefault} />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        data={COUNTRY_CODES}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => {
          return <ListItem item={item} getCountry={getCountry} />
        }}
      />
    </ScreenBase>
  </Modal>
)

const ListItem = ({ item, getCountry }) => {
  const { item: { code, dialCode, name } } = item
  return (
    <TouchableWithoutFeedback onPress={() => getCountry(code)}>
      <View style={styles.countryStyle}>
        <Text bodyOne>{name}</Text>
        <Text bodyOne color={colors.textLight} style={styles.dialCodeStyle}>{dialCode}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  topBar: {
    marginVertical: layout.s2,
    alignItems: 'flex-end',
    paddingHorizontal: layout.s3
  },
  list: {
    backgroundColor: colors.secondaryBackground,
    flex: 1
  },
  dialCodeStyle: {
    marginLeft: layout.s2
  },
  countryStyle: {
    flex: 1,
    paddingVertical: layout.s3,
    paddingHorizontal: layout.s3,
    flexDirection: 'row'
  }
})

export default InternationalPhoneDropdown
