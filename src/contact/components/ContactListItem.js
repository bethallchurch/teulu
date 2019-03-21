import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Text, Badge } from '@global/components'
import { darken } from '@global/styles/helpers'
import { colors, layout } from '@global/styles'

const ContactListItem = ({
  id,
  name,
  phoneNumber,
  owner = false,
  index,
  selectable,
  selected,
  onPress = () => null,
  itemContainerStyle = {}
}) => {
  return (
    <ListItem
      key={id}
      badge={badge(owner)}
      onPress={onPress}
      rightIcon={rightIcon(selectable, selected)}
      title={<Title title={name} subtitle={phoneNumber} />}
      containerStyle={[
        styles.item.container,
        { backgroundColor: selected ? darken(colors.primaryBackground, 15) : colors.secondaryBackground },
        itemContainerStyle
      ]}
      underlayColor='transparent'
    />
  )
}

const Title = ({ title, subtitle }) => title && title.length ? (
  <View style={styles.title.container}>
    <Text subtitleOne>{title}</Text>
    <Text caption color={colors.textLight} style={styles.title.subtitle}>{subtitle}</Text>
  </View>
) : <Text subtitleOne>{subtitle}</Text>

const rightIcon = (selectable, selected) => selectable && selected ? {
  name: 'check',
  size: layout.s4,
  color: colors.primary,
  containerStyle: styles.icon.container
} : null

const badge = owner => owner ? {
  value: <Badge>owner</Badge>,
  badgeStyle: { backgroundColor: 'transparent' }
} : null

const styles = {
  icon: StyleSheet.create({
    container: {
      position: 'absolute',
      right: layout.s3
    }
  }),
  item: StyleSheet.create({
    container: {
      marginBottom: layout.s2,
      position: 'relative'
    }
  }),
  title: StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center'
    },
    subtitle: {
      marginLeft: layout.s2
    }
  })
}

export default ContactListItem
