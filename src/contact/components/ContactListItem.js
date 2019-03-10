import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Text, Badge } from '@global/components'
import { colors, layout } from '@global/styles'

const ContactListItem = ({
  id,
  name,
  phoneNumber,
  owner = false,
  index,
  selectable,
  selected,
  onPress = () => null
}) => {
  return (
    <ListItem
      key={id}
      badge={badge(owner)}
      topDivider={index !== 0}
      onPress={onPress}
      rightIcon={rightIcon(selectable, selected)}
      title={<Title title={name} subtitle={phoneNumber} />}
    />
  )
}

const Title = ({ title, subtitle }) => title && title.length ? (
  <View style={styles.title.container}>
    <Text bodyOne>{title}</Text>
    <Text caption color={colors.textLight} style={styles.title.subtitle}>{subtitle}</Text>
  </View>
) : <Text bodyOne>{subtitle}</Text>

const rightIcon = (selectable, selected) => selectable ? {
  name: selected ? 'check-box' : 'check-box-outline-blank',
  color: selected ? colors.primary : colors.textDefault
} : null

const badge = owner => owner ? {
  value: <Badge>owner</Badge>,
  badgeStyle: { backgroundColor: colors.secondaryBackground }
} : null

const styles = {
  title: StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    subtitle: {
      marginLeft: layout.s2
    }
  })
}

export default ContactListItem
