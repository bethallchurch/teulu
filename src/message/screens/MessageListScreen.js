import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import { GiftedChat } from 'react-native-gifted-chat'
import uuid from 'uuid/v4'
import { ON_CREATE_MESSAGE, LIST_GROUP_MESSAGES, CREATE_MESSAGE } from '@message/MessageService'
import { LIST_CONTACTS } from '@contact/ContactService'
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
    const { contacts, messages } = this.props
    return messages.map(m => {
      const user = contacts.find(({ id }) => id === m.owner) || {}
      const username = user.name4 || user.phoneNumber
      const hasPhotos = m.photos.items.length > 0
      const albumName = hasPhotos ? m.photos.items[0].album.name : null
      const text = hasPhotos ? `${username} added a photo to ${albumName}` : m.text
      const image = hasPhotos ? m.photos.items[0].thumbnail.key : null
      const imageProps = hasPhotos ? { ...m.photos.items[0] } : null
      return {
        _id: m.id,
        captionText: hasPhotos,
        text,
        image,
        imageProps,
        createdAt: m.createdAt,
        user: {
          _id: m.owner,
          name: username
        }
      }
    })
  }

  sendMessage = (messages = []) => {
    const { userId, groupId, contacts } = this.props
    const authUsers = contacts.map(({ id }) => id)
    const input = {
      id: uuid(),
      owner: userId,
      messageGroupId: groupId,
      authUsers: authUsers,
      text: messages[0].text,
      type: 'TEXT'
    }
    this.props.sendMessage({ input })
  }

  renderMessageImage = props => {
    return <PhotoThumbnail width={250} height={250} {...props.currentMessage.imageProps} />
  }

  render () {
    return (
      <ScreenBase avoidKeyboard keyboardAvoidingViewProps={{ keyboardVerticalOffset: 130 }}>
        <GiftedChat
          renderUsernameOnMessage
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

const messageDataExtractor = ({ data: { getGroup } = {}, loading, error }) => ({
  error,
  loading: loading || !getGroup,
  messages: getGroup ? getGroup.messages.items : []
})

const contactDataExtractor = ({ data: { listUsers } = {}, loading, error }) => ({
  error,
  loading: loading || !listUsers,
  contacts: listUsers ? listUsers.items : []
})

const mapper = {
  user: <UserContext.Consumer />,
  createMessage: ({ render }) => (
    <Mutation mutation={CREATE_MESSAGE}>
      {mutation => render({ mutation })}
    </Mutation>
  ),
  messageData: ({ groupId, render }) => (
    <Query query={LIST_GROUP_MESSAGES} variables={{ groupId }} >
      {({ data, subscribeToMore }) => render({ data, subscribeToMore, groupId })}
    </Query>
  ),
  contactData: ({ render, messageData }) => {
    const authUsers = messageData.data.getGroup ? messageData.data.getGroup.authUsers : null
    if (authUsers) {
      const variables = { filter: { id: { in: authUsers } } }
      return (
        <Query query={LIST_CONTACTS} variables={variables}>
          {contactData => render(contactData)}
        </Query>
      )
    }
    return render({ data: {}, loading: true, error: false })
  }
}

const mapProps = ({ user, createMessage, messageData, contactData }) => {
  const { error: messageError, loading: messageLoading, messages } = messageDataExtractor(messageData)
  const { error: contactsError, loading: contactsLoading, contacts } = contactDataExtractor(contactData)
  return {
    userId: user.id,
    error: messageError || contactsError,
    loading: messageLoading && contactsLoading,
    messages: messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    contacts,
    create: ({ input }) => {
      createMessage.mutation({ variables: { input } })
    },
    subscribe: () => messageData.subscribeToMore({
      document: ON_CREATE_MESSAGE,
      variables: { messageGroupId: messageData.groupId },
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
      {({ userId, error, loading, messages, contacts, create, subscribe, authUsers }) => {
        if (error) return <Error />
        if (loading) return <Loading />
        return (
          <MessageListScreen
            userId={userId}
            groupId={groupId}
            sendMessage={create}
            messages={messages}
            contacts={contacts}
            subscribe={subscribe}
            {...props}
          />
        )
      }}
    </Connect>
  )
}

export default ConnectedMessageListScreen
