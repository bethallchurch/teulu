import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, ViewPropTypes } from 'react-native'
import SwiperFlatList from 'react-native-swiper-flatlist'

export default class Swiper extends Component {
  render () {
    return (
      <View style={this.props.containerStyle}>
        <SwiperFlatList index={this.props.startIndex}>
          {this.props.items.map(this.props.renderItem)}
        </SwiperFlatList>
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
