import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { graphqlOperation } from 'aws-amplify'
import * as queries from '@graphql/queries'
import * as mutations from '@graphql/mutations'
import * as subscriptions from '@graphql/subscriptions'
import { Connect } from 'aws-amplify-react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { UserContext } from '@global/context'

class MessagesScreen extends React.Component {
  constructor (props) {
    super(props)
    this.sendMessage = this.sendMessage.bind(this)
  }

  get messages () {
    return this.props.messages.map(m => ({
      _id: m.id,
      text: m.content,
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
        messageAlbumId: this.props.navigation.getParam('albumId'),
        viewers: this.props.contributors,
        content: m.text,
        type: 'TEXT'
      }
      await this.props.sendMessage({ input })
    }))
  }

  render () {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <GiftedChat
          messages={this.messages}
          onSend={this.sendMessage}
          user={{ _id: this.props.userId }}
        />
      </SafeAreaView>
    )
  }
}

const ConnectedMessagesScreen = props => {
  const albumId = props.navigation.getParam('albumId')
  return (
    <Connect
      query={graphqlOperation(queries.listMessages)}
      subscription={graphqlOperation(subscriptions.onCreateMessage)}
      mutation={graphqlOperation(mutations.createMessage)}
      onSubscriptionMsg={(previous, { onCreateMessage }) => {
        const belongsToThisGroup = onCreateMessage.album.id === albumId
        if (!belongsToThisGroup) {
          return previous
        }
        const { listMessages } = previous
        const newItems = [ onCreateMessage, ...listMessages.items ]
        return { ...previous, listMessages: { ...listMessages, items: newItems } }
      }}
    >
      {({ mutation, data: { listMessages }, loading, error }) => {
        if (error) return <Text>Error</Text>
        if (loading || !listMessages) return <Text>Loading...</Text>
        const albumMessages = listMessages.items
          .filter(message => !!message)
          .filter(({ album: { id } }) => id === albumId)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        const contributors = albumMessages[0].album.contributors
        return <MessagesScreen contributors={contributors} messages={albumMessages} sendMessage={mutation} {...props} />
      }}
    </Connect>
  )
}

const MessagesScreenWithContext = props => (
  <UserContext.Consumer>
    {({ userId }) => <ConnectedMessagesScreen userId={userId} {...props} />}
  </UserContext.Consumer>
)

const Temp = () => <View />

export default MessagesScreenWithContext
