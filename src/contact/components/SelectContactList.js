import React, { Component } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'
import { adopt } from 'react-adopt'
import { ApolloConsumer } from 'react-apollo'
import { LIST_PHONE_CONTACTS } from '@contact/ContactService'
import { LIST_USERS } from '@user/UserService'
import { chunk, flatten } from '@global/helpers'
import { UserContext } from '@global/context'
import { Error, Loading, Text } from '@global/components'
import NoContacts from '@contact/components/NoContacts'
import { colors, layout } from '@global/styles'

class SelectContactList extends Component {
  renderItem = ({ item: { id, name, phoneNumber } }) => {
    const { selectedContacts, onPressContact } = this.props
    const selected = selectedContacts.includes(id)
    console.log('name:', name, 'phoneNumber:', phoneNumber)
    return (
      <ListItem
        bottomDivider
        title={<Text bodyOne>{name || phoneNumber}</Text>}
        rightIcon={{
          name: selected ? 'check-box' : 'check-box-outline-blank',
          color: selected ? colors.primary : colors.textDefault
        }}
        onPress={() => onPressContact(id)}
      />
    )
  }

  render () {
    const { contacts, exclude = [] } = this.props
    const message = exclude.length <= 0
      ? 'Contacts from your phone who have downloaded the app will automatically appear here.'
      : 'No results.'
    return contacts.length > 0 ? (<FlatList
      extraData={this.props.selectedContacts}
      style={styles.list}
      keyExtractor={({ id }) => id}
      data={contacts}
      renderItem={this.renderItem}
    />) : <NoContacts onEmptyMessage={message} />
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: colors.secondaryBackground,
    marginBottom: layout.s3,
    width: '100%'
  }
})

class Contacts extends Component {
  state = { error: false, loading: true, data: {} }

  async componentDidMount () {
    const { client } = this.props
    const { phoneContacts } = client.readQuery({ query: LIST_PHONE_CONTACTS })
    const phoneNumbers = (phoneContacts || []).map(({ phoneNumber }) => phoneNumber)
    const chunked = chunk(phoneNumbers, 99)
    const result = await Promise.all(chunked.map(phoneNumbers => {
      const filter = {
        phoneNumber: { in: phoneNumbers }
      }
      return client.query({ query: LIST_USERS, variables: { filter } })
    }))
    // TODO: proper error handling
    const contacts = flatten(result.map(({ data }) => data.listUsers.items))
    this.setState({ data: { contacts }, loading: false })
  }

  render () {
    return (
      <>
        {this.props.render(this.state)}
      </>
    )
  }
}

const contactDataExtractor = ({ data: { contacts }, loading, error }) => ({
  error,
  loading: loading || !contacts,
  contacts: contacts || []
})

const mapper = {
  user: <UserContext.Consumer />,
  contactData: ({ render }) => {
    return (
      <ApolloConsumer>
        {client => <Contacts client={client} render={render} />}
      </ApolloConsumer>
    )
  }
}

const mapProps = ({ user, contactData }) => {
  const { error, loading, contacts } = contactDataExtractor(contactData)
  return { userId: user.id, error, loading, contacts }
}

const Connect = adopt(mapper, mapProps)

const ConnectedSelectContactList = props => (
  <Connect>
    {({ userId, error, loading, contacts }) => {
      if (error) return <Error />
      if (loading) return <Loading />
      return <SelectContactList userId={userId} contacts={contacts} {...props} />
    }}
  </Connect>
)

export default ConnectedSelectContactList
