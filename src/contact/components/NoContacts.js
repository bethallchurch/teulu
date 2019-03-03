import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Text } from '@global/components'
import { colors, layout } from '@global/styles'

const NoContacts = ({ onEmptyMessage }) => (
  <ListItem
    title={<Text bodyTwo>{onEmptyMessage}</Text>}
    containerStyle={styles.container}
  />
)

const styles = StyleSheet.create({
  container: {
    marginBottom: layout.s3,
    backgroundColor: colors.secondaryBackground,
    width: '100%'
  }
})

NoContacts.propTypes = {
  onEmptyMessage: PropTypes.string
}

NoContacts.defaultProps = {
  onEmptyMessage: 'No results.'
}

export default NoContacts
