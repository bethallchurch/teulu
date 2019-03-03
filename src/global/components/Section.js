import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { Card } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import { colors, layout } from '@global/styles'
import Text from '@global/components/Text'

const Section = ({ title, onPressTitle = null, listComponent }) => (
  <View>
    {onPressTitle && (
      <TouchableOpacity onPress={onPressTitle}>
        <Title pressable title={title} />
      </TouchableOpacity>
    )}
    {!onPressTitle && <Title title={title} />}
    <Card containerStyle={styles.listContainer}>
      {listComponent}
    </Card>
  </View>
)

const Title = ({ title, pressable }) => (
  <View style={styles.titleContainer}>
    <Text h6>{title}</Text>
    {pressable && <MaterialIcons name='chevron-right' color={colors.textDefault} size={layout.s4} />}
  </View>
)

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: layout.s3
  },
  listContainer: {
    padding: 0,
    marginTop: 0,
    borderWidth: 0
  }
})

export default Section
