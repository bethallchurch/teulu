import React from 'react'
import { graphqlOperation } from 'aws-amplify'
import { getGroup as customGetGroup } from '@mygraphql/queries'
import * as mutations from '@graphql/mutations'
import * as subscriptions from '@graphql/subscriptions'
import { Connect } from 'aws-amplify-react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { UserContext } from '@global/context'
import { ScreenBase, Error, Loading } from '@global/components'
import PhotoThumbnail from '@photo/components/PhotoThumbnail'
import Bubble from '@message/components/Bubble'
import MessageText from '@message/components/MessageText'

class MessagesScreen extends React.Component {
  constructor (props) {
    super(props)
    this.sendMessage = this.sendMessage.bind(this)
  }

  messages () {
    return this.props.messages.map(m => ({
      _id: m.id,
      text: m.text,
      image: m.photos.items.length ? m.photos.items[0].thumbnail.key : null,
      imageProps: m.photos.items.length ? { ...m.photos.items[0].thumbnail } : null,
      createdAt: m.createdAt,
      user: {
        _id: m.owner,
        name: m.owner
      }
    }))
  }

  async sendMessage (messages = []) {
    Promise.all(messages.map(async m => {
      const input = {
        owner: this.props.userId,
        messageGroupId: this.props.navigation.getParam('groupId'),
        authUsers: this.props.authUsers,
        text: m.text,
        type: 'TEXT'
      }
      await this.props.sendMessage({ input })
    }))
  }

  renderMessageImage = props => {
    return <PhotoThumbnail thumbnail={props.currentMessage.imageProps} />
  }

  render () {
    return (
      <ScreenBase avoidKeyboard keyboardAvoidingViewProps={{ keyboardVerticalOffset: 130 }}>
        <GiftedChat
          messages={this.messages()}
          onSend={this.sendMessage}
          user={{ _id: this.props.userId }}
          renderMessageImage={this.renderMessageImage}
          renderBubble={props => <Bubble {...props} />}
          renderMessageText={props => <MessageText {...props} />}
        />
      </ScreenBase>
    )
  }
}

const ConnectedMessagesScreen = props => {
  const groupId = props.navigation.getParam('groupId')
  return (
    <Connect
      query={graphqlOperation(customGetGroup, { id: groupId })}
      subscription={graphqlOperation(subscriptions.onCreateMessage, { messageGroupId: groupId })}
      mutation={graphqlOperation(mutations.createMessage)}
      onSubscriptionMsg={(previous, { onCreateMessage }) => {
        console.log('ON CREATE MSG:', onCreateMessage)
        const { getGroup } = previous
        const newItems = [ onCreateMessage, ...getGroup.messages.items ]
        return { ...previous, getGroup: { ...getGroup, messages: { ...getGroup.messages, items: newItems } }
        }
      }}
    >
      {({ mutation, data: { getGroup }, loading, error }) => {
        if (error) return <Error />
        if (loading || !getGroup) return <Loading />
        const sortedMessages = getGroup.messages.items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        return <MessagesScreen authUsers={getGroup.authUsers} messages={sortedMessages} sendMessage={mutation} {...props} />
      }}
    </Connect>
  )
}

const MessagesScreenWithContext = props => (
  <UserContext.Consumer>
    {user => <ConnectedMessagesScreen userId={user.id} {...props} />}
  </UserContext.Consumer>
)

export default MessagesScreenWithContext
