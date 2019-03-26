import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Text } from '@global/components'
import { layout } from '@global/styles'

const NoContacts = ({ onEmptyMessage }) => (
  <View style={styles.container}>
    <Text bodyTwo style={styles.text}>{onEmptyMessage}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: layout.s3,
    alignItems: 'center'
  },
  text: {
    marginVertical: layout.s3
  }
})

NoContacts.propTypes = {
  onEmptyMessage: PropTypes.string
}

NoContacts.defaultProps = {
  onEmptyMessage: 'No results.'
}

export default NoContacts
