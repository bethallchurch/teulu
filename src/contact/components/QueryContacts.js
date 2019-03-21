import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import { listPhoneContacts, LIST_CONTACTS } from '@contact/ContactService'
import { chunk, flatten } from '@global/helpers'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/combineLatest'

class QueryContacts extends Component {
  state = { error: false, loading: true, data: {} }

  async componentDidMount () {
    const phoneNumbers = await this.getPhoneNumbers()
    this.listContacts(phoneNumbers)
  }

  componentWillUnmount () {
    this.subscription && this.subscription.unsubscribe()
  }

  async getPhoneNumbers () {
    if (this.props.phoneNumbers) {
      return this.props.phoneNumbers
    }
    const phoneContacts = await listPhoneContacts()
    return phoneContacts.map(({ phoneNumber }) => phoneNumber)
  }

  async listContacts (phoneNumbers) {
    const { client } = this.props
    const chunked = chunk(phoneNumbers, 99)
    try {
      this.subscription = Observable.combineLatest(chunked.map(phoneNumbers => {
        const filter = { phoneNumber: { in: phoneNumbers } }
        return client.watchQuery({
          query: LIST_CONTACTS,
          variables: { filter },
          fetchPolicy: 'cache-and-network'
        })
      })).subscribe(result => {
        const contacts = flatten(result.map(({ data = {} }) => data.listUsers ? data.listUsers.items : []))
        this.setState({ data: { contacts }, loading: false })
      })
    } catch (error) {
      console.log('Error querying contacts:', error)
      this.setState({ error, loading: false })
    }
  }

  render () {
    return (
      <>
        {this.props.render(this.state)}
      </>
    )
  }
}

const ConnectedQueryContacts = props => (
  <ApolloConsumer>
    {client => <QueryContacts client={client} {...props} />}
  </ApolloConsumer>
)

export default ConnectedQueryContacts
