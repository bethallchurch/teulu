import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import { GiftedChat } from 'react-native-gifted-chat'
import { onCreateMessage, listGroupMessages, createMessage } from '@message/MessageService'
import { uniqueBy } from '@global/helpers'
import { UserContext } from '@global/context'
import { ScreenBase, Error, Loading } from '@global/components'
import PhotoThumbnail from '@photo/components/PhotoThumbnail'
import Bubble from '@message/components/Bubble'
import MessageText from '@message/components/MessageText'

class MessageListScreen extends Component {
  componentDidMount () {
    this.unsubscribe = this.props.subscribe()
  }

  componentWillUnmount () {
    this.unsubscribe && this.unsubscribe()
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

  sendMessage = (messages = []) => {
    const { userId, groupId, authUsers } = this.props
    const input = {
      owner: userId,
      messageGroupId: groupId,
      authUsers: authUsers,
      text: messages[0].text,
      type: 'TEXT'
    }
    this.props.sendMessage({ input })
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

const dataExtractor = ({ data: { getGroup }, loading, error }) => ({
  error,
  loading: loading || !getGroup,
  items: getGroup ? getGroup.messages.items : []
})

const mapper = {
  user: <UserContext.Consumer />,
  createMessage: ({ render }) => (
    <Mutation mutation={createMessage}>
      {mutation => render({ mutation })}
    </Mutation>
  ),
  messages: ({ groupId, render }) => (
    <Query query={listGroupMessages} variables={{ groupId }} >
      {({ data, subscribeToMore }) => render({ data, subscribeToMore, groupId })}
    </Query>
  )
}

const mapProps = ({ user, createMessage, messages }) => {
  const { error, loading, items } = dataExtractor({ data: messages.data })
  return {
    userId: user.id,
    error,
    loading,
    messages: items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    create: ({ input }) => {
      createMessage.mutation({ variables: { input } })
    },
    subscribe: () => messages.subscribeToMore({
      document: onCreateMessage,
      variables: { messageGroupId: messages.groupId },
      updateQuery: (previous, { subscriptionData }) => {
        if (!subscriptionData.data) return previous
        const newItem = subscriptionData.data.onCreateMessage
        const newItems = uniqueBy([ ...previous.getGroup.messages.items, newItem ], 'id')
        return { ...previous, getGroup: { ...previous.getGroup, messages: { ...previous.getGroup.messages, items: newItems } } }
      }
    })
  }
}

const Connect = adopt(mapper, mapProps)

const ConnectedMessageListScreen = props => {
  const groupId = props.navigation.getParam('groupId')
  return (
    <Connect groupId={groupId}>
      {({ userId, error, loading, messages, create, subscribe }) => {
        if (error) return <Error />
        if (loading) return <Loading />
        return (
          <MessageListScreen
            userId={userId}
            groupId={groupId}
            sendMessage={create}
            messages={messages}
            subscribe={subscribe}
            {...props}
          />
        )
      }}
    </Connect>
  )
}

export default ConnectedMessageListScreen
