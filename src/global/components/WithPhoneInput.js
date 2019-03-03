import { COUNTRY_CODES } from '@global/constants'
import WithInputs from '@global/components/WithInputs'

export const defaultDialCode = COUNTRY_CODES.find(({ code }) => code === 'GB').dialCode

export default class WithPhoneInput extends WithInputs {
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
