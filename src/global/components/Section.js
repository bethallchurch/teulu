import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors, layout } from '@global/styles'
import Text from '@global/components/Text'

const Section = ({ title, onPressTitle = null, listComponent, containerStyle = {} }) => (
  <View style={[ styles.container, containerStyle ]}>
    {onPressTitle && (
      <TouchableOpacity onPress={onPressTitle}>
        <Title pressable title={title} />
      </TouchableOpacity>
    )}
    {!onPressTitle && <Title title={title} />}
    <View containerStyle={styles.listContainer}>
      {listComponent}
    </View>
  </View>
)

const Title = ({ title, pressable }) => (
  <View style={styles.titleContainer}>
    <Text h6>{title}</Text>
    {pressable && <MaterialIcons name='chevron-right' color={colors.textDefault} size={layout.s4} />}
  </View>
)

const styles = StyleSheet.create({
  container: {
    padding: layout.s3
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: layout.s3
  },
  listContainer: {
    padding: 0,
    marginTop: 0,
    borderWidth: 0
  }
})

export default Section
