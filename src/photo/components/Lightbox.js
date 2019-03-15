import React, { Component, Children, cloneElement } from 'react'
import {
  View,
  TouchableHighlight
} from 'react-native'
import { Overlay } from '@global/components'
import { colors } from '@global/styles'

class Lightbox extends Component {
  state = { isOpen: false }

  getContent = () => {
    const { children, activeProps } = this.props
    if (activeProps) {
      return cloneElement(Children.only(children), activeProps)
    }
    return children
  }

  open = () => this.setState({ isOpen: true })
  close = () => this.setState({ isOpen: false })

  render () {
    return (
      <View>
        <TouchableHighlight underlayColor={colors.primaryBackground} onPress={this.open}>
          {this.props.children}
        </TouchableHighlight>
        <Overlay isOpen={this.state.isOpen} close={this.close} children={this.getContent()} />
      </View>
    )
  }
}

export default Lightbox
