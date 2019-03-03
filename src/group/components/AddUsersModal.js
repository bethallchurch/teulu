import React from 'react'
import PropTypes from 'prop-types'
import { View, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from '@global/components'
import SelectContactList from '@contact/components/SelectContactList'
import { colors, layout } from '@global/styles'

const AddUsersModal = ({ visible, hide, toggleUser, users, newUsers }) => (
  <Modal transparent visible={visible} onRequestClose={hide}>
    <TouchableOpacity style={styles.touchable} onPress={hide}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text h5 style={styles.text}>Add New Members</Text>
          <SelectContactList
            exclude={users.map(({ id }) => id)}
            selectedContacts={newUsers}
            onPressContact={toggleUser}
          />
          <Text subtitleTwo>Coming Soon!</Text>
        </View>
      </View>
    </TouchableOpacity>
  </Modal>
)

const styles = StyleSheet.create({
  touchable: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.overlayBackground
  },
  contentContainer: {
    padding: layout.s3,
    margin: layout.s3,
    backgroundColor: colors.primaryBackground
  },
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
