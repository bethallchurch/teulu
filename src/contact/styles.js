import { StyleSheet } from 'react-native'
import { colors, mb3, pa3, w100Pc } from '@global/styles'

export const selectContactListStyle = StyleSheet.create({
  list: {
    backgroundColor: colors.secondaryBackground,
    ...mb3,
    ...w100Pc
  }
})

export const noContactsStyle = StyleSheet.create({
  container: {
    ...mb3,
    backgroundColor: colors.secondaryBackground,
    ...w100Pc
  }
})
