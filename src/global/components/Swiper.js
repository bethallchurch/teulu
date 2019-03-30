import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, ViewPropTypes } from 'react-native'
import ImageViewer from '@global/components/Test'
import Image from '@photo/components/Image'

export default class Swiper extends Component {
  render () {
    return (
      <View style={this.props.containerStyle}>
        <ImageViewer
          index={this.props.startIndex}
          imageUrls={this.props.items.map(item => ({ url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460', props: item }))}
          renderImage={props => {
            const { imgKey, style } = props
            return (
              <Image
                resizeMode='contain'
                imgKey={imgKey.replace('public/', '')}
                style={style}
              />
            )
          }}
        />
      </View>
    )
  }
}

Swiper.propTypes = {
  items: PropTypes.array,
  renderItem: PropTypes.func,
  startIndex: PropTypes.number,
  containerStyle: ViewPropTypes.style
}

Swiper.defaultProps = {
  items: [],
  startIndex: 0,
  containerStyle: {},
  renderItem: () => null
}
