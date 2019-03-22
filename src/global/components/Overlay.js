import React, { Component } from 'react'
import {
  Dimensions,
  Platform,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  StatusBar
} from 'react-native'
import { Icon } from 'react-native-elements'
import { Constants } from 'expo'
import { colors, layout } from '@global/styles'

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window')
const STATUS_BAR_OFFSET = Constants.statusBarHeight
const IS_IOS = Platform.OS === 'ios'

export default class Overlay extends Component {
  componentDidMount () {
    if (this.props.isOpen && IS_IOS) {
      StatusBar.setHidden(this.props.isOpen, 'fade')
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
        <View
          style={[
            styles.background,
            { backgroundColor: this.props.backgroundColor }
          ]}
        />
        <View style={styles.content}>
          {this.props.children}
        </View>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.props.close}>
            <Icon name='close' color={this.props.iconColor} />
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
}

Overlay.defaultProps = {
  backgroundColor: colors.overlayBackground,
  iconColor: colors.primaryBackground
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT
  },
  content: {
    left: 0,
    top: 0,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT - STATUS_BAR_OFFSET,
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
