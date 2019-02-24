import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { Card } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import { copyStyle, colors, w4 } from '@global/styles'
import { sectionStyle } from '@home/styles'

const Section = ({ title, onPressTitle, listComponent }) => (
  <View>
    <TouchableOpacity onPress={onPressTitle}>
      <View style={sectionStyle.titleContainer}>
        <Text style={copyStyle.bold}>{title}</Text>
        <MaterialIcons name='chevron-right' color={colors.textDefault} size={w4.width} />
      </View>
    </TouchableOpacity>
    <Card containerStyle={sectionStyle.listContainer}>
      {listComponent}
    </Card>
  </View>
)

export default Section

