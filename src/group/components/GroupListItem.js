import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Text } from '@global/components'
import { colors, layout } from '@global/styles'

const GroupListItem = ({ id, title, index, compact, navigateToGroup }) => (
  <ListItem
    title={<Text subtitleOne>{title}</Text>}
    onPress={() => navigateToGroup(id, title)}
    style={compact ? {} : styles.default.item}
    contentContainerStyle={compact ? {} : styles.default.container}
    containerStyle={compact ? styles.compact.container : {}}
    leftAvatar={avatarConfig(title[0])}
    rightIcon={iconConfig}
    topDivider={compact && index !== 0}
  />
)

const avatarConfig = initial => ({ rounded: true, title: initial, overlayContainerStyle: styles.avatar.overlay })
const iconConfig = { name: 'chevron-right', color: colors.textLight }

const styles = {
  default: StyleSheet.create({
    container: {
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
