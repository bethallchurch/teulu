import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Text } from '@global/components'
import { colors, layout } from '@global/styles'

const AddMembersButton = ({ onPress }) => (
  <ListItem
    onPress={onPress}
    style={styles.item}
    containerStyle={styles.container}
    contentContainerStyle={styles.contentContainer}
    title={<Text subtitleOne style={styles.title}>Add Members</Text>}
    leftIcon={{ name: 'group-add', color: colors.primary, size: layout.s4 }}
  />
)

const styles = StyleSheet.create({
  container: {
    marginBottom: layout.s3,
    borderColor: colors.primary,
    backgroundColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth
  },
  title: {
    color: colors.primary
  }
})

export default AddMembersButton
