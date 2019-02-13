import { Contacts } from 'expo'
import { COUNTRY_CODES } from '@contacts/constants'
import { intersection } from '@global/helpers'
import { listUsers } from '@user/UserService'

export const getPhoneContacts = async () => {
  const { data } = await Contacts.getContactsAsync()
  return data
}

export const getContacts = async () => {
  // TODO: change to query with filter
  const appUsers = await listUsers()

  // const phoneContacts = await getPhoneContacts()
  // const appUsersPhoneNumbers = appUsers.reduce(
  //   (numbers, { phoneNumber }) => [ ...numbers, phoneNumber ],
  //   []
  // )
  // const validContacts = phoneContacts.filter(({ phoneNumbers }) => {
  //   return intersection(phoneNumbers.reduce(
  //     (numbers, { countryCode, digits }) => {
  //       const number = `${COUNTRY_CODES[countryCode.toUpperCase()].code}${digits}`
  //       return [ ...numbers, number ]
  //     },
  //     []
  //   ), appUsersPhoneNumbers).length > 0
  // })

  // TODO: for dev purposes
  return appUsers
}
