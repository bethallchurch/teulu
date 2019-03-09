import gql from 'graphql-tag'
import { Contacts } from 'expo'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { uniqueBy } from '@global/helpers'
import * as myQueries from '@mygraphql/queries'

// Queries
export const LIST_CONTACTS = gql(myQueries.listContacts)
export const LIST_PHONE_CONTACTS = gql(myQueries.listPhoneContacts)

export const listPhoneContacts = async () => {
  const contactStore = []

  const { data: contacts } = await Contacts.getContactsAsync()

  contacts.forEach(({ name, phoneNumbers }) => {
    phoneNumbers && phoneNumbers.forEach(({ number }) => {
      // TODO: currently assuming phone numbers GB by default
      const phoneNumber = parsePhoneNumberFromString(number, 'GB')
      const valid = phoneNumber.isValid()
      if (valid) {
        contactStore.push({ __typename: 'PhoneContact', name, phoneNumber: phoneNumber.number })
      }
    })
  })

  return uniqueBy(contactStore, 'phoneNumber')
}
