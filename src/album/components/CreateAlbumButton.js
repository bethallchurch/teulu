import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Text } from '@global/components'
import { colors, layout } from '@global/styles'

const CreateAlbumButton = ({ width, margin, onPress }) => (
  <TouchableOpacity style={[ styles.buttonContainer, { width, height: width }, margin ]} onPress={onPress}>
    <View style={styles.button}>
      <MaterialIcons name='add' size={layout.s5} color={colors.primary} />
      <Text subtitleTwo style={styles.text}>New Album</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  buttonContainer: {},
  button: {
    borderColor: colors.textLight,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flex: 1
  },
  text: {
    position: 'absolute',
    bottom: layout.s2,
    left: layout.s2,
    color: colors.primary
  }
})

export default CreateAlbumButton
