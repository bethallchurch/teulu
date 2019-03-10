import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import { LIST_PHONE_CONTACTS, LIST_CONTACTS } from '@contact/ContactService'
import { chunk, flatten } from '@global/helpers'

class QueryContacts extends Component {
  state = { error: false, loading: true, data: {} }

  async componentDidMount () {
    const { client } = this.props
    const { phoneContacts } = client.readQuery({ query: LIST_PHONE_CONTACTS })
    const phoneNumbers = (phoneContacts || []).map(({ phoneNumber }) => phoneNumber)
    const chunked = chunk(phoneNumbers, 99)
    try {
      const result = await Promise.all(chunked.map(phoneNumbers => {
        const filter = { phoneNumber: { in: phoneNumbers } }
        return client.query({ query: LIST_CONTACTS, variables: { filter } })
      }))
      const contacts = flatten(result.map(({ data }) => data.listUsers.items))
      this.setState({ data: { contacts }, loading: false })
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
