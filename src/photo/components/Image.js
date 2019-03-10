import React, { Component } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Image as RNEImage } from 'react-native-elements'
import { Storage } from 'aws-amplify'

class Image extends Component {
  state = { src: null }

  mounted = false

  componentDidMount () {
    this.mounted = true
    this.load()
  }

  componentWillUnmount () {
    this.mounted = false
  }

  componentDidUpdate (prevProps) {
    if (prevProps.imgKey !== this.props.imgKey) {
      this.load()
    }
  }

  async load () {
    const { imgKey: key } = this.props
    const url = await Storage.get(key, { level: 'public' })
    if (this.mounted) {
      this.setState({ src: { uri: url } })
    }
  }

  render () {
    const { src } = this.state
    const { style, resizeMode } = this.props
    return src ? (
      <RNEImage source={src} resizeMode={resizeMode} style={style} />
    ) : (
      <View style={[ style, { justifyContent: 'center', alignItems: 'center' } ]}>
        <ActivityIndicator />
      </View>
    )
  }
}

export default Image
