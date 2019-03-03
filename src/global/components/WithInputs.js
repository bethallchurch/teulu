import { Component } from 'react'

export default class WithInputs extends Component {
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  getInputRoot = refName => {
    return this.refs[refName].refs[refName]
  }

  focusInput = refName => {
    this.getInputRoot(refName).focus()
  }
}
