import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Text } from '@global/components'
import { colors, layout } from '@global/styles'

const CreateGroupButton = ({ onPress }) => (
  <ListItem
    title={<Text subtitleOne style={styles.title}>New Group</Text>}
    onPress={onPress}
    style={styles.item}
    contentContainerStyle={styles.contentContainer}
    containerStyle={styles.container}
    leftIcon={{ name: 'add', color: colors.primary, size: layout.s5 }}
  />
)

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.primary,
    backgroundColor: 'transparent'
  },
  contentContainer: {
    padding: layout.s2
  },
  item: {
    marginHorizontal: layout.s3,
    marginVertical: layout.s2
  },
  title: {
    color: colors.primary
  }
})

export default CreateGroupButton
