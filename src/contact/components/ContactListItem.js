import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem, Divider } from 'react-native-elements'
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
  onPress = () => null,
  itemContainerStyle = {}
}) => {
  return (
    <>
      {index !== 0 && <Divider style={styles.item.divider} />}
      <ListItem
        key={id}
        badge={badge(owner)}
        onPress={onPress}
        rightIcon={rightIcon(selectable, selected)}
        title={<Title title={name} subtitle={phoneNumber} />}
        containerStyle={[ styles.item.container, itemContainerStyle ]}
        underlayColor={colors.textLight}
      />
    </>
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
  badgeStyle: { backgroundColor: 'transparent' }
} : null

const styles = {
  item: StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      paddingHorizontal: 0
    },
    divider: {
      backgroundColor: colors.textLight
    }
  }),
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
