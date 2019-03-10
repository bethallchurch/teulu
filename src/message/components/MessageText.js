import React from 'react'
import { MessageText as GiftedMessageText } from 'react-native-gifted-chat'
import { colors, typography } from '@global/styles'

const MessageText = props => (
  <GiftedMessageText
    {...props}
    textStyle={{
      ...props.textStyle,
      right: {
        ...(props.currentMessage.captionText ? typography.caption : typography.bodyOne),
        color: colors.primaryBackground
      },
      left: {
        ...(props.currentMessage.captionText ? typography.caption : typography.bodyOne),
        color: colors.textDefault
      }
    }}
  />
)

export default MessageText
