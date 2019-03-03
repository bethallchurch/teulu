import { StyleSheet } from 'react-native'
import { fBold, colors } from '@global/styles'

export const logOutButtonStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.primary
  },
  title: {
    color: colors.primaryBackground,
    ...fBold
  }
})
