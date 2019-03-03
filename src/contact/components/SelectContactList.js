import React, { Component } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Permissions } from 'expo'
import { getContacts } from '@contact/ContactService'
import { UserContext } from '@global/context'
import { Loading, Text } from '@global/components'
import NoContacts from '@contact/components/NoContacts'
import { colors, layout } from '@global/styles'

class SelectContactList extends Component {
  state = { contacts: [], loading: true }

  async componentDidMount () {
    try {
      const { status } = await Permissions.askAsync(Permissions.CONTACTS)
      if (status === 'granted') {
        const contacts = await getContacts()
        this.setState({ contacts, loading: false })
      }
    } catch (error) {
      console.log('Error getting contacts:', error)
      this.setState({ loading: false })
    }
  }

  renderItem = ({ item: { id, name, phoneNumber } }) => {
    const { selectedContacts, onPressContact } = this.props
    const selected = selectedContacts.includes(id)
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
    const { contacts, loading } = this.state
    const { exclude = [] } = this.props
    const message = exclude.length <= 0
      ? 'Contacts from your phone who have downloaded the app will automatically appear here.'
      : 'No results.'
    if (loading) return <Loading />
    return contacts.length > 0 ? (<FlatList
      extraData={this.props.selectedContacts}
      style={styles.list}
      keyExtractor={({ id }) => id}
      data={contacts}
      renderItem={this.renderItem}
    />) : <NoContacts onEmptyMessage={message} />
  }
}

const SelectContactListWithContext = props => (
  <UserContext.Consumer>
    {user => <SelectContactList userId={user.id} {...props} />}
  </UserContext.Consumer>
)

const styles = StyleSheet.create({
  list: {
    backgroundColor: colors.secondaryBackground,
    marginBottom: layout.s3,
    width: '100%'
  }
})

export default SelectContactListWithContext
