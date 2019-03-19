import React, { Component } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { adopt } from 'react-adopt'
import { UserContext } from '@global/context'
import { Error, Loading } from '@global/components'
import NoContacts from '@contact/components/NoContacts'
import QueryContacts from '@contact/components/QueryContacts'
import ContactListItem from '@contact/components/ContactListItem'
import { layout } from '@global/styles'

class SelectContactList extends Component {
  renderItem = ({ item, index }) => {
    const { selectedContacts, onPressContact, itemContainerStyle } = this.props
    const selected = selectedContacts.includes(item.id)
    return (
      <ContactListItem
        {...item}
        selectable
        index={index}
        name={item.name4}
        selected={selected}
        onPress={() => onPressContact(item.id)}
        itemContainerStyle={itemContainerStyle}
      />
    )
  }

  render () {
    const { exclude = [] } = this.props
    const message = exclude.length <= 0
      ? 'Contacts from your phone who have downloaded the app will automatically appear here.'
      : 'No results'
    const contacts = this.props.contacts.filter(({ id }) => !exclude.includes(id))
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
    marginBottom: layout.s3,
    width: '100%'
  }
})

const dataExtractor = ({ data: { contacts } = {}, loading, error }) => ({
  error,
  loading: loading || !contacts,
  contacts: contacts || []
})

const mapper = {
  user: <UserContext.Consumer />,
  contactData: ({ phoneNumbers, render }) => (
    <QueryContacts phoneNumbers={phoneNumbers} render={render} />
  )
}

const mapProps = ({ user, contactData }) => {
  const { error, loading, contacts } = dataExtractor(contactData)
  return { userId: user.id, error, loading, contacts }
}

const Connect = adopt(mapper, mapProps)

const ConnectedSelectContactList = props => (
  <Connect phoneNumbers={props.phoneNumbers}>
    {({ userId, error, loading, contacts }) => {
      if (error) return <Error />
      if (loading) return <Loading />
      return <SelectContactList userId={userId} contacts={contacts} {...props} />
    }}
  </Connect>
)

export default ConnectedSelectContactList
