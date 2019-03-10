// NOTE: copied from here without animations: https://github.com/oblador/react-native-lightbox

import React, { Component, Children, cloneElement } from 'react'
import {
  Dimensions,
  Platform,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar
} from 'react-native'
import { Icon } from 'react-native-elements'
import { colors, layout } from '@global/styles'

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window')
const STATUS_BAR_OFFSET = Platform.OS === 'android' ? -25 : 0
const IS_IOS = Platform.OS === 'ios'

class LightboxOverlay extends Component {
  componentDidMount () {
    if (this.props.isOpen) {
      this.open()
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.isOpen !== this.props.isOpen && IS_IOS) {
      StatusBar.setHidden(this.props.isOpen, 'fade')
    }
  }

  render () {
    return (
      <Modal visible={this.props.isOpen} transparent onRequestClose={this.props.close}>
        <View style={styles.overlay.background} />
        <View style={styles.overlay.content}>
          {this.props.children}
        </View>
        <View style={styles.overlay.header}>
          <TouchableOpacity onPress={this.props.close}>
            <Icon name='close' color={colors.primaryBackground} />
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
}

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
        <LightboxOverlay isOpen={this.state.isOpen} close={this.close} children={this.getContent()} />
      </View>
    )
  }
}

const styles = {
  overlay: StyleSheet.create({
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: WINDOW_WIDTH,
      height: WINDOW_HEIGHT,
      backgroundColor: colors.overlayBackground
    },
    content: {
      left: 0,
      top: STATUS_BAR_OFFSET + layout.s3 * 3,
      width: WINDOW_WIDTH,
      height: WINDOW_HEIGHT - (STATUS_BAR_OFFSET + layout.s3 * 3),
      position: 'absolute',
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'transparent'
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: WINDOW_WIDTH,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      padding: layout.s3
    }
  })
}

export default Lightbox
