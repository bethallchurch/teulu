import React, { Component, Children, cloneElement } from 'react'
import {
  View,
  TouchableHighlight,
  Dimensions
} from 'react-native'
import { Overlay } from '@global/components'
import Slider from '@photo/components/ImageSlider'
import { colors } from '@global/styles'

const { width: WINDOW_WIDTH } = Dimensions.get('window')

class Lightbox extends Component {
  state = { isOpen: false }

  getContent = () => {
    const { children, activeProps, galleryData, galleryStartIndex } = this.props
    if (activeProps && galleryData.length <= 1) {
      return cloneElement(Children.only(children), activeProps)
    }

    // TODO: clone child and pass as component to be updated
    if (activeProps && galleryData.length > 1) {
      return (
        <Slider
          width={WINDOW_WIDTH}
          position={galleryStartIndex}
          dataSource={galleryData.map(image => ({ imageProps: image }))}
        />
      )
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
