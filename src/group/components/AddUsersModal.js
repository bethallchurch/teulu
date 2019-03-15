import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Text, Overlay, FullWidthButton } from '@global/components'
import SelectContactList from '@contact/components/SelectContactList'
import { colors, layout } from '@global/styles'

const AddUsersModal = ({ visible, hide, toggleUser, users, newUsers, addUsers }) => (
  <Overlay isOpen={visible} close={hide} backgroundColor={colors.primaryBackground} iconColor={colors.textDefault}>
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
      <View style={{ padding: layout.s3 }}>
        <Text h5 style={styles.text}>Add Members</Text>
        <SelectContactList
          exclude={users.map(({ id }) => id)}
          selectedContacts={newUsers}
          onPressContact={toggleUser}
        />
      </View>
      <FullWidthButton
        title='Add Members'
        onPress={addUsers}
        rightIcon={<RightIcon numUsers={newUsers.length} />}
      />
    </SafeAreaView>
  </Overlay>
)

const RightIcon = numUsers => (
  <MaterialIcons
    name={numUsers > 1 ? 'group-add' : 'person-add'}
    size={layout.s4}
    color={colors.primaryBackground}
  />
)

const styles = StyleSheet.create({
  text: {
    marginBottom: layout.s2
  }
})

AddUsersModal.propTypes = {
  visible: PropTypes.bool,
  hide: PropTypes.func.isRequired,
  toggleUser: PropTypes.func.isRequired,
  users: PropTypes.array,
  newUsers: PropTypes.array
}

AddUsersModal.defaultProps = {
  visible: false,
  users: [],
  newUsers: []
}

export default AddUsersModal
