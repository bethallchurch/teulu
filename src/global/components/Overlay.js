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
import { SafeAreaView } from 'react-navigation'
import { Icon } from 'react-native-elements'
import { colors, layout } from '@global/styles'

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window')
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
        >
          <SafeAreaView emulateUnlessSupported style={styles.header}>
            <TouchableOpacity onPress={this.props.close}>
              <Icon name='close' color={this.props.iconColor} />
            </TouchableOpacity>
          </SafeAreaView>
          <SafeAreaView emulateUnlessSupported style={styles.content}>
            {this.props.children}
          </SafeAreaView>
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
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT
  },
  content: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center'
  },
  header: {
    flexDirection: 'row',
    padding: layout.s3,
    justifyContent: 'flex-end'
  }
})
