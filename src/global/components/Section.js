import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { Card } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import { copyStyle, colors, w4 } from '@global/styles'
import { sectionStyle } from '@home/styles'

const Section = ({ title, onPressTitle = null, listComponent }) => (
  <View>
    {onPressTitle && (
      <TouchableOpacity onPress={onPressTitle}>
        <Title pressable title={title} />
      </TouchableOpacity>
    )}
    {!onPressTitle && <Title title={title} />}
    <Card containerStyle={sectionStyle.listContainer}>
      {listComponent}
    </Card>
  </View>
)

const Title = ({ title, pressable }) => (
  <View style={sectionStyle.titleContainer}>
    <Text style={copyStyle.bold}>{title}</Text>
    {pressable && <MaterialIcons name='chevron-right' color={colors.textDefault} size={w4.width} />}
  </View>
)

export default Section

