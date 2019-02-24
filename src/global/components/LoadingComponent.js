import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { loadingComponentStyle, colors } from '@global/styles'

const LoadingComponent = () => (
  <View style={loadingComponentStyle.container}>
    <ActivityIndicator size='large' color={colors.primary} />
  </View>
)

export default LoadingComponent
