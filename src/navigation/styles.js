import { StyleSheet } from 'react-native'
import { colors, layout, typography } from '@global/styles'

const { create, flatten } = StyleSheet

export const stackNavigatorStyle = {
  headerStyle: {
    backgroundColor: '#fff'
  },
  headerTintColor: typography.h6.color,
  headerTitleStyle: flatten(typography.h6, { fontWeight: '500' })
}

export const bottomTabNavigatorStyle = create({
  container: {
    backgroundColor: colors.primaryBackground,
    borderTopWidth: 0,
    paddingBottom: layout.s2
  },
  label: flatten([
    typography.caption,
    { color: colors.textLight, marginTop: layout.s1 }
  ])
})
