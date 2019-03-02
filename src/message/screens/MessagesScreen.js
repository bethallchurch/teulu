import React, { Component } from 'react'
import { SafeAreaView, Text, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, StatusBar } from 'react-native'
import { graphqlOperation } from 'aws-amplify'
import { getGroup as customGetGroup } from '@customgraphql/queries'
import * as mutations from '@graphql/mutations'
import * as subscriptions from '@graphql/subscriptions'
import { Connect } from 'aws-amplify-react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { UserContext } from '@global/context'
import Loading from '@global/components/Loading'
import Error from '@global/components/Error'
import { colors } from '@global/styles'
import { getMessage } from '@message/MessageService'
import { getPhoto } from '@photo/PhotoService'
import { PhotoListItem } from '@photo/components/PhotoList'

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

  render () {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryBackground }}>
        <StatusBar />
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' enabled keyboardVerticalOffset={130}>
          <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
            <GiftedChat
              messages={this.messages()}
              onSend={this.sendMessage}
              user={{ _id: this.props.userId }}
              renderMessageImage={({ currentMessage }) => <PhotoListItem thumbnail={currentMessage.imageProps} />}
            />
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
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
