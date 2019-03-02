import React from 'react'
import { MessageText as GiftedMessageText } from 'react-native-gifted-chat'
import { colors, copyStyle } from '@global/styles'

const MessageText = props => (
  <GiftedMessageText
    {...props}
    textStyle={{
      ...props.textStyle,
      right: {
        ...copyStyle.regular,
        color: colors.primaryBackground
      }
    }}
  />
)

export default MessageText
