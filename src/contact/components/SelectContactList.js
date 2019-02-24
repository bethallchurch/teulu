import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Permissions } from 'expo'
import { getContacts } from '@contact/ContactService'
import { UserContext } from '@global/context'
import Loading from '@global/components/Loading'
import NoContacts from '@contact/components/NoContacts'
import { colors, copyStyle } from '@global/styles'
import { selectContactListStyle } from '@contact/styles'

class SelectContactList extends Component {
  state = { contacts: [], loading: true }

  async componentDidMount () {
    const { exclude = [] } = this.props
    try {
      const { status } = await Permissions.askAsync(Permissions.CONTACTS)
      if (status === 'granted') {
        const { data: { listUsers: { items: contacts } } } = await getContacts()
        this.setState({
          contacts: contacts.filter(({ id }) => !exclude.includes(id)).filter(({ id }) => id !== this.props.userId),
          loading: false
        })
      }
    } catch (error) {
      console.log('Error getting contacts:', error)
      this.setState({ loading: false })
    }
  }

  renderItem = ({ item: { id, phoneNumber }}) => {
    const { selectedContacts, onPressContact } = this.props
    const selected = selectedContacts.includes(id)
    return (
      <ListItem
        bottomDivider
        title={phoneNumber}
        titleStyle={copyStyle.regular}
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
    const message  = exclude.length <= 0 ?
      'Contacts from your phone who have downloaded the app will automatically appear here.' :
      'No results.'
    if (loading) return <Loading />
    return contacts.length > 0 ? (<FlatList
      extraData={this.props.selectedContacts}
      style={selectContactListStyle.list}
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

export default SelectContactListWithContext
