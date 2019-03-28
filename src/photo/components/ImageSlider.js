import React, { Component } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  PanResponder
} from 'react-native'
import Image from '@photo/components/Image'

export default class Slideshow extends Component {
  state = {
    position: 0,
    scrolling: false
  }

  onRef (ref) {
    this.ref = ref
    if (ref && this.state.position !== this.getPosition()) {
      this.move(this.getPosition())
    }
  }

  move (index) {
    const isUpdating = index !== this.getPosition()
    this.ref.scrollTo({ x: this.props.width * index, y: 0, animated: true })
    this.setState({ position: index })
    if (isUpdating && this.props.onPositionChanged) {
      this.props.onPositionChanged(index)
    }
  }

  getPosition () {
    if (typeof this.props.position === 'number') {
      return this.props.position
    }
    return this.state.position
  }

  componentDidUpdate (prevProps) {
    if (prevProps.position !== this.props.position) {
      this.move(this.props.position)
    }
  }

  // TODO: method deprecated
  componentWillMount () {
    let release = (e, gestureState) => {
      const width = this.props.width
      const relativeDistance = gestureState.dx / width
      const vx = gestureState.vx
      let change = 0

      if (relativeDistance < -0.5 || (relativeDistance < 0 && vx <= 0.5)) {
        change = 1
      } else if (relativeDistance > 0.5 || (relativeDistance > 0 && vx >= 0.5)) {
        change = -1
      }
      const position = this.getPosition()
      if (position === 0 && change === -1) {
        change = 0
      } else if (position + change >= this.props.dataSource.length) {
        change = (this.props.dataSource.length) - (position + change)
      }
      this.move(position + change)
      return true
    }

    this._panResponder = PanResponder.create({
      onPanResponderRelease: release
    })
  }

  render () {
    return (
      <View style={[ this.props.containerStyle, { flex: 1 } ]}>
        <ScrollView
          horizontal
          style={styles.container}
          decelerationRate={0.99}
          snapToAlignment='center'
          ref={ref => this.onRef(ref)}
          snapToInterval={this.props.width}
          {...this._panResponder.panHandlers}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={this.props.scrollEnabled}
        >
          {this.props.dataSource.map(({ imageProps }, index) => {
            // TODO: unnecessary to tie to images
            return (
              <View key={index}>
                <Image
                  {...imageProps}
                />
              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  }
})
