import { StyleSheet } from 'react-native'
import { colors, layout, typography } from '@global/styles'

const { create, flatten } = StyleSheet

export const stackNavigatorStyle = {
  headerStyle: {
    backgroundColor: colors.primaryBackground,
    borderBottomWidth: 0,
    elevation: 0
  },
  headerLeftContainerStyle: { paddingLeft: layout.s2 },
  headerRightContainerStyle: { paddingRight: layout.s2 },
  headerTintColor: typography.h6.color,
  headerTitleStyle: flatten(typography.h6, { fontWeight: '500' })
}

export const bottomTabNavigatorStyle = create({
  container: {
    backgroundColor: colors.primaryBackground,
    borderTopWidth: 0,
    paddingVertical: layout.s2,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62
  },
  label: flatten([
    typography.caption,
    { color: colors.textLight, marginTop: layout.s1 }
  ])
})
