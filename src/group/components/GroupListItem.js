import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Text } from '@global/components'
import { darken } from '@global/styles/helpers'
import { colors, layout } from '@global/styles'

const GroupListItem = ({ group, navigateToGroup }) => (
  <ListItem
    style={styles.default.item}
    leftAvatar={avatarConfig(group.name[0])}
    title={<Text subtitleOne>{group.name}</Text>}
    containerStyle={styles.default.container}
    onPress={() => navigateToGroup(group.id, group.name)}
    contentContainerStyle={styles.default.contentContainer}
    rightIcon={{ name: 'chevron-right', color: colors.textLight }}
  />
)

export const SelectGroupListItem = ({
  group,
  onPress,
  selected,
  selectedGroupId
}) => {
  return (
    <ListItem
      style={styles.select.item}
      onPress={() => onPress(group)}
      selectedGroupId={selectedGroupId}
      rightIcon={rightIconConfig(selected)}
      leftAvatar={avatarConfig(group.name[0])}
      title={<Text subtitleOne>{group.name}</Text>}
      containerStyle={[
        styles.select.container,
        { backgroundColor: selected ? darken(colors.primaryBackground, 15) : 'transparent' }
      ]}
    />
  )
}

const avatarConfig = initial => ({
  rounded: true, title: initial, overlayContainerStyle: styles.avatar.overlay
})

const rightIconConfig = selected => selected ? ({
  name: 'check', color: colors.primary
}) : null

const styles = {
  default: StyleSheet.create({
    contentContainer: {
      padding: layout.s2
    },
    item: {
      marginHorizontal: layout.s3,
      marginVertical: layout.s2
    }
  }),
  select: StyleSheet.create({
    container: {
      paddingVertical: layout.s2
    },
    item: {
      marginHorizontal: layout.s3
    }
  }),
  avatar: StyleSheet.create({
    overlay: {
      backgroundColor: colors.textDefault
    }
  })
}

export default GroupListItem
