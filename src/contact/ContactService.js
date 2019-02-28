import { Contacts } from 'expo'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { COUNTRY_CODES } from '@global/constants'
import { intersection, unique, compact, flatten, chunk } from '@global/helpers'
import { listUsers } from '@user/UserService'

const contactStore = {}

export const getPhoneContacts = () => Contacts.getContactsAsync()

export const getContacts = async () => {
  const { data: phoneContacts } = await getPhoneContacts()

  const filteredPhoneContacts = phoneContacts.map(({ name, phoneNumbers, ...rest }) => {
    return {
      name,
      phoneNumbers: phoneNumbers ? compact(unique(phoneNumbers.map(({ number }) => {
        const phoneNumber = parsePhoneNumberFromString(number, 'GB')
        const valid = phoneNumber.isValid()
        if (valid) {
          contactStore[phoneNumber.number] = name
        }
        return phoneNumber && valid ? phoneNumber.number : null
      }))) : []
    }
  }).filter(({ phoneNumbers }) => phoneNumbers.length > 0)

  const filters = chunk(flatten(filteredPhoneContacts.map(
    ({ phoneNumbers }) => phoneNumbers.reduce(
      (acc, phoneNumber) => ({ phoneNumber: { eq: phoneNumber } }), []
    )
  )), 5).map(batch => ({ or: batch }))

  const result = await Promise.all(filters.map(filter => listUsers(filter)))

  return flatten(result.map(({ data: { listUsers: { items }}}) => {
    return items.map(item => ({ ...item, name: contactStore[item.phoneNumber] }))
  }))
}
