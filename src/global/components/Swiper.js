import React, { Component } from 'react'
import { Animated, View, StyleSheet } from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom'
import Image from '@photo/components/Image'

export default class Swiper extends Component {
  state = { currentShowIndex: 0 }

  width = 0
  height = 0

  standardPositionX = 0
  fadeAnim = new Animated.Value(0)

  positionXNumber = 0
  positionX = new Animated.Value(0)

  hasLayout = false

  componentDidMount () {
    this.init(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.index !== this.state.currentShowIndex) {
      this.setState({
        currentShowIndex: nextProps.index
      }, () => {
        this.jumpToCurrentImage()
        Animated.timing(this.fadeAnim, {
          toValue: 1,
          duration: 200
        }).start()
      })
    }
  }

  init (nextProps) {
    if (nextProps.images.length === 0) {
      this.fadeAnim.setValue(0)
      return this.setState({ currentShowIndex: 0 })
    }

    this.setState({
      currentShowIndex: nextProps.index
    }, () => {
      this.jumpToCurrentImage()
      Animated.timing(this.fadeAnim, {
        toValue: 1,
        duration: 200
      }).start()
    })
  }

  jumpToCurrentImage () {
    this.positionXNumber = this.width * (this.state.currentShowIndex || 0) * -1
    this.standardPositionX = this.positionXNumber
    this.positionX.setValue(this.positionXNumber)
  }

  handleHorizontalOuterRangeOffset = offsetX => {
    this.positionXNumber = this.standardPositionX + offsetX
    this.positionX.setValue(this.positionXNumber)
  }

  handleResponderRelease = vx => {
    const isLeftMove = this.positionXNumber - this.standardPositionX > (this.props.flipThreshold || 0)
    const isRightMove = this.positionXNumber - this.standardPositionX < -(this.props.flipThreshold || 0)

    if (vx > 0.7) {
      this.goBack()
      return
    } else if (vx < -0.7) {
      this.goNext()
      return
    }

    if (isLeftMove) {
      this.goBack()
    } else if (isRightMove) {
      this.goNext()
    } else {
      this.resetPosition()
    }
  }

  goBack = () => {
    if (this.state.currentShowIndex === 0) {
      this.resetPosition()
      return
    }

    this.positionXNumber = this.standardPositionX + this.width
    this.standardPositionX = this.positionXNumber
    Animated.timing(this.positionX, {
      toValue: this.positionXNumber,
      duration: this.props.pageAnimateTime
    }).start()

    const nextIndex = (this.state.currentShowIndex || 0) - 1

    this.setState({ currentShowIndex: nextIndex })
  }

  goNext = () => {
    if (this.state.currentShowIndex === this.props.images.length - 1) {
      this.resetPosition()
      return
    }

    this.positionXNumber = this.standardPositionX - this.width
    this.standardPositionX = this.positionXNumber
    Animated.timing(this.positionX, {
      toValue: this.positionXNumber,
      duration: this.props.pageAnimateTime
    }).start()

    const nextIndex = (this.state.currentShowIndex || 0) + 1

    this.setState({ currentShowIndex: nextIndex })
  }

  resetPosition () {
    this.positionXNumber = this.standardPositionX
    Animated.timing(this.positionX, {
      toValue: this.standardPositionX,
      duration: 150
    }).start()
  }

  handleCancel = () => {
    this.hasLayout = false
  }

  handleLayout = event => {
    if (event.nativeEvent.layout.width !== this.width) {
      this.hasLayout = true

      this.width = event.nativeEvent.layout.width
      this.height = event.nativeEvent.layout.height

      this.forceUpdate()
      this.jumpToCurrentImage()
    }
  }

  getContent () {
    const screenWidth = this.width
    const screenHeight = this.height

    const ImageElements = this.props.images.map((image, index) => {
      if ((this.state.currentShowIndex || 0) > index + 1 || (this.state.currentShowIndex || 0) < index - 1) {
        return <View key={index} style={{ width: screenWidth, height: screenHeight }} />
      }

      let { width, height } = image.props

      if (width > screenWidth) {
        const widthPixel = screenWidth / width
        width *= widthPixel
        height *= widthPixel
      }

      if (height > screenHeight) {
        const HeightPixel = screenHeight / height
        width *= HeightPixel
        height *= HeightPixel
      }

      return (
        <ImageZoom
          key={index}
          imageWidth={width}
          imageHeight={height}
          cropWidth={this.width}
          cropHeight={this.height}
          maxOverflow={this.props.maxOverflow}
          pinchToZoom={this.props.enableImageZoom}
          responderRelease={this.handleResponderRelease}
          enableDoubleClickZoom={this.props.enableImageZoom}
          doubleClickInterval={this.props.doublePressInterval}
          horizontalOuterRangeOffset={this.handleHorizontalOuterRangeOffset}
        >
          {this.props.renderImage(image.props)}
        </ImageZoom>
      )
    })

    return (
      <Animated.View style={{ zIndex: 9, backgroundColor: this.props.backgroundColor, opacity: this.fadeAnim }}>
        <Animated.View
          style={{
            ...styles.moveBox,
            transform: [{ translateX: this.positionX }],
            width: this.width * this.props.images.length
          }}
        >
          {ImageElements}
        </Animated.View>
      </Animated.View>
    )
  }

  render () {
    return (
      <View onLayout={this.handleLayout} style={{ flex: 1, overflow: 'hidden', ...this.props.style }}>
        {this.getContent()}
      </View>
    )
  }
}

Swiper.defaultProps = {
  index: 0,
  style: {},
  images: [],
  maxOverflow: 300,
  flipThreshold: 80,
  pageAnimateTime: 100,
  enableImageZoom: true,
  backgroundColor: 'black',
  renderImage: props => {
    const { imgKey, style } = props
    return (
      <Image
        resizeMode='contain'
        imgKey={imgKey.replace('public/', '')}
        style={{ width: '100%', height: '100%', ...style }}
      />
    )
  }
}

const styles = StyleSheet.create({
  moveBox: { flexDirection: 'row', alignItems: 'center' }
})
