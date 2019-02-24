import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { loadingStyle, colors } from '@global/styles'

const Loading = ({ backgroundColor = colors.primaryBackground }) => (
  <View style={{ ...loadingStyle.container, backgroundColor }}>
    <ActivityIndicator size='large' color={colors.primary} />
  </View>
)

export default Loading
