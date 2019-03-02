import React from 'react'
import { Bubble as GiftedBubble } from 'react-native-gifted-chat'
import { colors } from '@global/styles'

const Bubble = props => (
  <GiftedBubble
    {...props}
    wrapperStyle={{
      right: {
        backgroundColor: colors.secondary
      }
    }}
  />
)

export default Bubble
