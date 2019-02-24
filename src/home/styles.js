import { StyleSheet } from 'react-native'
import { pa3 } from '@global/styles'

export const homeScreenStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryBackground,
    flex: 1
  }
})

export const sectionStyle = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    ...pa3
  },
  listContainer: {
    padding: 0,
    marginTop: 0
  }
})
