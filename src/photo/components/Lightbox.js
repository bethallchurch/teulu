import React, { Component, Children, cloneElement } from 'react'
import { View, TouchableHighlight } from 'react-native'
import { Overlay, Swiper } from '@global/components'
import { colors } from '@global/styles'

class Lightbox extends Component {
  state = { isOpen: false }

  open = () => this.setState({ isOpen: true })
  close = () => this.setState({ isOpen: false })

  getContent = () => {
    const { children, activeProps, swiperImages, swiperIndex } = this.props
    if (activeProps && swiperImages.length <= 1) {
      return this.renderActive({ children, props: activeProps })
    }
    if (activeProps && swiperImages.length > 1) {
      return (
        <Swiper index={swiperIndex} images={swiperImages} />
      )
    }
    return children
  }

  renderActive ({ children, props, index = 0 }) {
    return cloneElement(Children.only(children), { ...props, key: index })
  }

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
