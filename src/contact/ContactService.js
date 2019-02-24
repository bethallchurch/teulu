import { Contacts } from 'expo'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { COUNTRY_CODES } from '@global/constants'
import { intersection, unique, compact, flatten } from '@global/helpers'
import { listUsers } from '@user/UserService'

// filter = {
//   or: [
//     {
//       phoneNumber: { eq: '+447584568972' }
//     }
//   ]
// }

export const getPhoneContacts = () => Contacts.getContactsAsync()

export const getContacts = async () => {
  // TODO: change to query with filter
  const { data: phoneContacts } = await getPhoneContacts()

  const filteredPhoneContacts = phoneContacts.map(({ name, phoneNumbers, ...rest }) => {
    return {
      name,
      phoneNumbers: phoneNumbers ? compact(unique(phoneNumbers.map(({ number }) => {
        const phoneNumber = parsePhoneNumberFromString(number, 'GB')
        return phoneNumber && phoneNumber.isValid() ? phoneNumber.number : null
      }))) : []
    }
  }).filter(({ phoneNumbers }) => phoneNumbers.length > 0)

  const filter = {
    or: flatten(filteredPhoneContacts.map(
      ({ phoneNumbers }) => phoneNumbers.reduce(
        (acc, phoneNumber) => ({ phoneNumber: { eq: phoneNumber } }), []
      )
    ))
  }

  // console.log(filter.or.length)// ugh Invalid FilterExpression: Expression size has exceeded the maximum allowed size;

  const appUsers = await listUsers()

  // console.log(appUsers)

  // const appUsersPhoneNumbers = appUsers.reduce(
  //   (numbers, { phoneNumber }) => [ ...numbers, phoneNumber ],
  //   []
  // )
  // const validContacts = phoneContacts.filter(({ phoneNumbers }) => {
  //   return intersection(phoneNumbers.reduce(
  //     (numbers, { countryCode, digits }) => {
  //      TODO! untested code
          // const { dialCode } = COUNTRY_CODES.find(({ code }) => code === countryCode)
  //       const number = `${dialCode}${digits}`
  //       return [ ...numbers, number ]
  //     },
  //     []
  //   ), appUsersPhoneNumbers).length > 0
  // })

  // TODO: for dev purposes
  return appUsers
}
