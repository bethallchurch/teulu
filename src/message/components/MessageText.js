import React from 'react'
import { MessageText as GiftedMessageText } from 'react-native-gifted-chat'
import { colors, typography } from '@global/styles'

// TODO: left?
const MessageText = props => (
  <GiftedMessageText
    {...props}
    textStyle={{
      ...props.textStyle,
      right: {
        ...typography.bodyOne,
        color: colors.primaryBackground
      }
    }}
  />
)

export default MessageText
