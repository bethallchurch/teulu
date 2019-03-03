import { COUNTRY_CODES } from '@global/constants'
import ComponentWithInputs from '@global/components/ComponentWithInputs'

export const defaultDialCode = COUNTRY_CODES.find(({ code }) => code === 'GB').dialCode

export default class ComponentWithPhoneInput extends ComponentWithInputs {
  get phoneNumber () {
    const { dialCode, nationalNumber } = this.state
    return `${dialCode}${nationalNumber}`
  }

  showModal = () => {
    this.setState({ modalVisible: true })
  }

  hideModal = () => {
    this.setState({ modalVisible: false })
  }

  getCountry = countryCode => {
    const { dialCode } = COUNTRY_CODES.find(({ code }) => code === countryCode)
    this.setState({ dialCode })
    this.hideModal()
  }
}
