import { Contacts } from 'expo'

export const contacts = async () => {
  const { data } = await Contacts.getContactsAsync()
  return data
}
