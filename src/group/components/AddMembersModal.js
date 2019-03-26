import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Text, Overlay, FullWidthButton } from '@global/components'
import SelectContactList from '@contact/components/SelectContactList'
import { colors, layout } from '@global/styles'

const AddMembersModal = ({ visible, hide, toggleUser, users, newUsers, addUsers }) => (
  <Overlay isOpen={visible} close={hide} backgroundColor={colors.primaryBackground} iconColor={colors.textDefault}>
    <View style={styles.container}>
      <Text h5 style={styles.title}>Add Members</Text>
      <SelectContactList
        exclude={users.map(({ id }) => id)}
        selectedContacts={newUsers}
        onPressContact={toggleUser}
      />
      <FullWidthButton
        title='Add Members'
        onPress={addUsers}
        rightIcon={<RightIcon numUsers={newUsers.length} />}
      />
    </View>
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
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  title: {
    marginHorizontal: layout.s4
  }
})

AddMembersModal.propTypes = {
  visible: PropTypes.bool,
  hide: PropTypes.func.isRequired,
  toggleUser: PropTypes.func.isRequired,
  users: PropTypes.array,
  newUsers: PropTypes.array
}

AddMembersModal.defaultProps = {
  visible: false,
  users: [],
  newUsers: []
}

export default AddMembersModal
