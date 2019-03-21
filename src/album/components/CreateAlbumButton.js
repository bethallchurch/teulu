import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Text } from '@global/components'
import { colors, layout } from '@global/styles'

const CreateAlbumButton = ({ width, margin, onPress }) => (
  <TouchableOpacity style={[ styles.buttonContainer, margin ]} onPress={onPress}>
    <View style={[ styles.button, { width, height: layout.r4to3(width) } ]}>
      <MaterialIcons name='add' size={layout.s5} color={colors.primary} />
    </View>
    <Text subtitleTwo style={styles.text}>New Album</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  buttonContainer: {},
  button: {
    borderColor: colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: colors.primary,
    paddingVertical: layout.s1
  }
})

export default CreateAlbumButton
