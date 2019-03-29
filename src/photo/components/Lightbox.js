import React, { Component, Children, cloneElement } from 'react'
import { View, TouchableHighlight } from 'react-native'
import { Overlay, Swiper } from '@global/components'
import { colors } from '@global/styles'

class Lightbox extends Component {
  state = { isOpen: false }

  open = () => this.setState({ isOpen: true })

  close = () => this.setState({ isOpen: false })

  getContent = () => {
    const { children, activeProps, galleryData, galleryStartIndex } = this.props
    if (activeProps && galleryData.length <= 1) {
      return cloneElement(Children.only(children), activeProps)
    }
    if (activeProps && galleryData.length > 1) {
      return (
        <Swiper
          containerStyle={{ flex: 1 }}
          startIndex={galleryStartIndex}
          items={galleryData}
          renderItem={(image, index) => cloneElement(
            Children.only(children), { key: index, ...image }
          )}
        />
      )
    }
    return children
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
