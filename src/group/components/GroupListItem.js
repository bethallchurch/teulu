import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Text } from '@global/components'
import { colors, layout } from '@global/styles'

const GroupListItem = ({
  group,
  compact,
  navigateToGroup,
  selected = false,
  selectable = false,
  onPress = () => null,
  selectedGroupId = null
}) => {
  const { id, name } = group
  const defaultOnPress = () => navigateToGroup(id, name)
  return (
    <ListItem
      selectedGroupId={selectedGroupId}
      leftAvatar={avatarConfig(name[0])}
      title={<Text subtitleOne>{name}</Text>}
      style={compact ? {} : styles.default.item}
      rightIcon={rightIcon(selectable, selected)}
      onPress={onPress ? () => onPress(group) : defaultOnPress}
      contentContainerStyle={compact ? {} : styles.default.contentContainer}
      containerStyle={compact ? styles.compact.container : styles.default.container}
    />
  )
}

const avatarConfig = initial => ({ rounded: true, title: initial, overlayContainerStyle: styles.avatar.overlay })

const rightIcon = (selectable, selected) => selectable ? {
  name: selected ? 'check-box' : 'check-box-outline-blank',
  color: selected ? colors.primary : colors.textDefault
} : { name: 'chevron-right', color: colors.textLight }

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
  compact: StyleSheet.create({
    container: {
      paddingVertical: layout.s2
    }
  }),
  avatar: StyleSheet.create({
    overlay: {
      backgroundColor: colors.textDefault
    }
  })
}

export default GroupListItem
