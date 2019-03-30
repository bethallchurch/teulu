import React, { Component, Children, cloneElement } from 'react'
import { View, TouchableHighlight, Dimensions } from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom'
import { Overlay, Swiper } from '@global/components'
import { colors } from '@global/styles'

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window')

class Lightbox extends Component {
  state = { isOpen: false }

  open = () => this.setState({ isOpen: true })

  close = () => this.setState({ isOpen: false })

  getContent = () => {
    const { children, activeProps, galleryData, galleryStartIndex } = this.props
    if (activeProps && galleryData.length <= 1) {
      return this.renderActive({ children, props: activeProps })
    }
    if (activeProps && galleryData.length > 1) {
      return (
        <Swiper
          containerStyle={{ flex: 1 }}
          startIndex={galleryStartIndex}
          items={galleryData}
          renderItem={(image, index) => {
            return this.renderActive({ children, props: image, index })
          }}
        />
      )
    }
    return children
  }

  renderActive ({ children, props, index = 0 }) {
    return (
      <ImageZoom
        key={index}
        cropWidth={WINDOW_WIDTH}
        cropHeight={WINDOW_HEIGHT}
        imageWidth={props.style.width}
        imageHeight={props.style.height}
      >
        {cloneElement(Children.only(children), props)}
      </ImageZoom>
    )
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
