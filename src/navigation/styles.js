import { StyleSheet } from 'react-native'
import { colors, fBold, fDefault, f3, f6, mt1, pb2, mr2, pa1, br100 } from '@global/styles'

export const headerTitleStyle = StyleSheet.create({
  style: {
    color: colors.textDefault,
    ...fBold,
    ...f3
  }
})

export const tabBarStyle = StyleSheet.create({
  style: {
    backgroundColor: colors.primaryBackground,
    borderTopWidth: 0,
    ...pb2
  }
})

export const tabBarLabelStyle = StyleSheet.create({
  style: {
    color: colors.textLight,
    ...f6,
    ...fDefault,
    ...mt1
  }
})

export const headerIconStyle = StyleSheet.create({
  style: {
    ...br100,
    ...pa1,
    ...mr2
  }
})
