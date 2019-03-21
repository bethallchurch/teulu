import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Dimensions, ViewPropTypes } from 'react-native'

export class SquareGrid extends Component {
  get itemWidth () {
    const { numColumns, gutterWidth, containerPadding, containerWidth } = this.props
    const gutterSpace = (numColumns - 1) * gutterWidth
    const paddingSpace = containerPadding * 2
    const spaceToDivide = containerWidth - (gutterSpace + paddingSpace)
    return spaceToDivide / numColumns
  }

  itemMargin = index => {
    const { gutterWidth, numColumns, data } = this.props
    const numItems = data.length
    const numRows = Math.ceil(numItems / numColumns)
    const firstRow = index + 1 <= numColumns
    const lastRow = index > (numItems - numColumns) + (numItems % numColumns)
    const firstColumn = index === 0 || index % numColumns === 0
    const lastColumn = (index + 1) % numColumns === 0
    return {
      marginTop: firstRow ? 0 : gutterWidth / 2,
      marginRight: lastColumn ? 0 : gutterWidth / 2,
      marginBottom: lastRow || numRows === 1 ? 0 : gutterWidth / 2,
      marginLeft: firstColumn ? 0 : gutterWidth / 2
    }
  }

  renderItem = ({ item, index }) => (
    this.props.renderItem({
      item,
      width: this.itemWidth,
      margin: this.itemMargin(index),
      index
    })
  )

  render () {
    const { data, numColumns, containerPadding, keyExtractor } = this.props
    return (
      <FlatList
        contentContainerStyle={{ padding: containerPadding }}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        data={data}
        renderItem={this.renderItem}
      />
    )
  }
}

SquareGrid.propTypes = {
  data: PropTypes.array,
  numColumns: PropTypes.number,
  gutterWidth: PropTypes.number,
  containerPadding: PropTypes.number,
  containerWidth: PropTypes.number,
  keyExtractor: PropTypes.func,
  containerStyle: ViewPropTypes.style
}

SquareGrid.defaultProps = {
  data: [],
  numColumns: 2,
  gutterWidth: 0,
  containerPadding: 0,
  containerWidth: Dimensions.get('window').width,
  keyExtractor: ({ id }) => id,
  containerStyle: {}
}
