import * as React from 'react'

import {
  Animated,
  CameraRoll,
  I18nManager,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom'

const styles = (
  width,
  height,
  backgroundColor
) => {
  return {
    modalContainer: { backgroundColor, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
    watchOrigin: { position: 'absolute', width, bottom: 20, justifyContent: 'center', alignItems: 'center' },
    watchOriginTouchable: {
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5,
      paddingBottom: 5,
      borderRadius: 30,
      borderColor: 'white',
      borderWidth: 0.5,
      backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    watchOriginText: { color: 'white', backgroundColor: 'transparent' },
    imageStyle: {},
    container: { backgroundColor }, // 多图浏览需要调整整体位置的盒子
    moveBox: { flexDirection: 'row', alignItems: 'center' },
    menuContainer: { position: 'absolute', width, height, left: 0, bottom: 0, zIndex: 12 },
    menuShadow: {
      position: 'absolute',
      width,
      height,
      backgroundColor: 'black',
      left: 0,
      bottom: 0,
      opacity: 0.2,
      zIndex: 10
    },
    menuContent: { position: 'absolute', width, left: 0, bottom: 0, zIndex: 11 },
    operateContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      height: 40,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1
    },
    operateText: { color: '#333' },
    loadingTouchable: { width, height },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    arrowLeftContainer: { position: 'absolute', top: 0, bottom: 0, left: 0, justifyContent: 'center', zIndex: 13 },
    arrowRightContainer: { position: 'absolute', top: 0, bottom: 0, right: 0, justifyContent: 'center', zIndex: 13 }
  }
}

const startState = {
  show: false,
  currentShowIndex: 0,
  imageLoaded: false,
  imageSizes: [],
  isShowMenu: false
}

export default class ImageViewer extends React.Component {
  state = startState
  // 背景透明度渐变动画
  fadeAnim = new Animated.Value(0)

  // 当前基准位置
  standardPositionX = 0

  // 整体位移，用来切换图片用
  positionXNumber = 0
  positionX = new Animated.Value(0)

  width = 0
  height = 0

  styles = styles(0, 0, 'transparent')

  // 是否执行过 layout. fix 安卓不断触发 onLayout 的 bug
  hasLayout = false

  // 记录已加载的图片 index
  loadedIndex = new Map()

  handleLongPressWithIndex = new Map()

  imageRefs = []

  componentDidMount () {
    this.init(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.index !== this.state.currentShowIndex) {
      this.setState(
        {
          currentShowIndex: nextProps.index
        },
        () => {
          // 立刻预加载要看的图
          this.loadImage(nextProps.index || 0)

          this.jumpToCurrentImage()

          // 显示动画
          Animated.timing(this.fadeAnim, {
            toValue: 1,
            duration: 200
          }).start()
        }
      )
    }
  }

  /**
   * props 有变化时执行
   */
  init (nextProps) {
    if (nextProps.imageUrls.length === 0) {
      // 隐藏时候清空
      this.fadeAnim.setValue(0)
      return this.setState(startState)
    }

    // 给 imageSizes 塞入空数组
    const imageSizes = []
    nextProps.imageUrls.forEach(imageUrl => {
      imageSizes.push({
        width: imageUrl.width || 0,
        height: imageUrl.height || 0,
        status: 'loading'
      })
    })

    this.setState(
      {
        currentShowIndex: nextProps.index,
        imageSizes
      },
      () => {
        // 立刻预加载要看的图
        this.loadImage(nextProps.index || 0)

        this.jumpToCurrentImage()

        // 显示动画
        Animated.timing(this.fadeAnim, {
          toValue: 1,
          duration: 200
        }).start()
      }
    )
  }
  /**
   * reset Image scale and position
   */
  resetImageByIndex = (index) => {
    this.imageRefs[index] && this.imageRefs[index].reset()
  }
  /**
   * 调到当前看图位置
   */
  jumpToCurrentImage () {
    // 跳到当前图的位置
    this.positionXNumber = this.width * (this.state.currentShowIndex || 0) * (I18nManager.isRTL ? 1 : -1)
    this.standardPositionX = this.positionXNumber
    this.positionX.setValue(this.positionXNumber)
  }

  /**
   * 加载图片，主要是获取图片长与宽
   */
  loadImage (index) {
    if (!this.state.imageSizes[index]) {
      return
    }

    if (this.loadedIndex.has(index)) {
      return
    }
    this.loadedIndex.set(index, true)

    const image = this.props.imageUrls[index]
    const imageStatus = { ...this.state.imageSizes[index] }

    // 保存 imageSize
    const saveImageSize = () => {
      // 如果已经 success 了，就不做处理
      if (this.state.imageSizes[index] && this.state.imageSizes[index].status !== 'loading') {
        return
      }

      const imageSizes = this.state.imageSizes.slice()
      imageSizes[index] = imageStatus
      this.setState({ imageSizes })
    }

    if (this.state.imageSizes[index].status === 'success') {
      // 已经加载过就不会加载了
      return
    }

    // 如果已经有宽高了，直接设置为 success
    if (this.state.imageSizes[index].width > 0 && this.state.imageSizes[index].height > 0) {
      imageStatus.status = 'success'
      saveImageSize()
      return
    }

    // 是否加载完毕了图片
    let imageLoaded = false

    // Tagged success if url is started with file:, or not set yet(for custom source.uri).
    if (!image.url || image.url.startsWith(`file:`)) {
      imageLoaded = true
    }

    // 如果已知源图片宽高，直接设置为 success
    if (image.width && image.height) {
      if (this.props.enablePreload && imageLoaded === false) {
        Image.prefetch(image.url)
      }
      imageStatus.width = image.width
      imageStatus.height = image.height
      imageStatus.status = 'success'
      saveImageSize()
      return
    }

    Image.getSize(
      image.url,
      (width: number, height: number) => {
        imageStatus.width = width
        imageStatus.height = height
        imageStatus.status = 'success'
        saveImageSize()
      },
      () => {
        try {
          const data = Image.resolveAssetSource(image.props.source)
          imageStatus.width = data.width
          imageStatus.height = data.height
          imageStatus.status = 'success'
          saveImageSize()
        } catch (newError) {
          // Give up..
          imageStatus.status = 'fail'
          saveImageSize()
        }
      }
    )
  }

  /**
  * 预加载图片
  */
  preloadImage = (index) => {
    if (index < this.state.imageSizes.length) {
      this.loadImage(index + 1)
    }
  }
  /**
   * 触发溢出水平滚动
   */
  handleHorizontalOuterRangeOffset = (offsetX) => {
    this.positionXNumber = this.standardPositionX + offsetX
    this.positionX.setValue(this.positionXNumber)

    const offsetXRTL = !I18nManager.isRTL ? offsetX : -offsetX

    if (offsetXRTL < 0) {
      if (this.state.currentShowIndex || this.props.imageUrls.length - 1 > 0) {
        this.loadImage((this.state.currentShowIndex || 0) + 1)
      }
    } else if (offsetXRTL > 0) {
      if (this.state.currentShowIndex) {
        this.loadImage((this.state.currentShowIndex || 0) - 1)
      }
    }
  }

  /**
   * 手势结束，但是没有取消浏览大图
   */
  handleResponderRelease = (vx) => {
    const vxRTL = I18nManager.isRTL ? -vx : vx
    const isLeftMove = I18nManager.isRTL
      ? this.positionXNumber - this.standardPositionX < -(this.props.flipThreshold || 0)
      : this.positionXNumber - this.standardPositionX > (this.props.flipThreshold || 0)
    const isRightMove = I18nManager.isRTL
      ? this.positionXNumber - this.standardPositionX > (this.props.flipThreshold || 0)
      : this.positionXNumber - this.standardPositionX < -(this.props.flipThreshold || 0)

    if (vxRTL > 0.7) {
      // 上一张
      this.goBack()

      // 这里可能没有触发溢出滚动，为了防止图片不被加载，调用加载图片
      if (this.state.currentShowIndex) {
        this.loadImage((this.state.currentShowIndex || 0) - 1)
      }
      return
    } else if (vxRTL < -0.7) {
      // 下一张
      this.goNext()
      if (this.state.currentShowIndex || this.props.imageUrls.length - 1 > 0) {
        this.loadImage((this.state.currentShowIndex || 0) + 1)
      }
      return
    }

    if (isLeftMove) {
      // 上一张
      this.goBack()
    } else if (isRightMove) {
      // 下一张
      this.goNext()
    } else {
      // 回到之前的位置
      this.resetPosition()
    }
  }

  /**
   * 到上一张
   */
  goBack = () => {
    if (this.state.currentShowIndex === 0) {
      // 回到之前的位置
      this.resetPosition()
      return
    }

    this.positionXNumber = !I18nManager.isRTL
      ? this.standardPositionX + this.width
      : this.standardPositionX - this.width
    this.standardPositionX = this.positionXNumber
    Animated.timing(this.positionX, {
      toValue: this.positionXNumber,
      duration: this.props.pageAnimateTime
    }).start()

    const nextIndex = (this.state.currentShowIndex || 0) - 1

    this.setState(
      {
        currentShowIndex: nextIndex
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.currentShowIndex)
        }
      }
    )
  }

  /**
   * 到下一张
   */
  goNext = () => {
    if (this.state.currentShowIndex === this.props.imageUrls.length - 1) {
      // 回到之前的位置
      this.resetPosition()
      return
    }

    this.positionXNumber = !I18nManager.isRTL
      ? this.standardPositionX - this.width
      : this.standardPositionX + this.width
    this.standardPositionX = this.positionXNumber
    Animated.timing(this.positionX, {
      toValue: this.positionXNumber,
      duration: this.props.pageAnimateTime
    }).start()

    const nextIndex = (this.state.currentShowIndex || 0) + 1

    this.setState(
      {
        currentShowIndex: nextIndex
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.currentShowIndex)
        }
      }
    )
  }

  /**
   * 回到原位
   */
  resetPosition () {
    this.positionXNumber = this.standardPositionX
    Animated.timing(this.positionX, {
      toValue: this.standardPositionX,
      duration: 150
    }).start()
  }

  /**
   * 长按
   */
  handleLongPress = (image) => {
    if (this.props.saveToLocalByLongPress) {
      // 出现保存到本地的操作框
      this.setState({ isShowMenu: true })
    }

    if (this.props.onLongPress) {
      this.props.onLongPress(image)
    }
  }

  /**
   * 单击
   */
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.handleCancel, this.state.currentShowIndex)
    }
  }

  /**
   * 双击
   */
  handleDoubleClick = () => {
    if (this.props.onDoubleClick) {
      this.props.onDoubleClick(this.handleCancel)
    }
  }

  /**
   * 退出
   */
  handleCancel = () => {
    this.hasLayout = false
    if (this.props.onCancel) {
      this.props.onCancel()
    }
  }

  /**
   * 完成布局
   */
  handleLayout = (event) => {
    if (event.nativeEvent.layout.width !== this.width) {
      this.hasLayout = true

      this.width = event.nativeEvent.layout.width
      this.height = event.nativeEvent.layout.height
      this.styles = styles(this.width, this.height, this.props.backgroundColor || 'transparent')

      // 强制刷新
      this.forceUpdate()
      this.jumpToCurrentImage()
    }
  }

  /**
   * 获得整体内容
   */
  getContent () {
    // 获得屏幕宽高
    const screenWidth = this.width
    const screenHeight = this.height

    const ImageElements = this.props.imageUrls.map((image, index) => {
      if ((this.state.currentShowIndex || 0) > index + 1 || (this.state.currentShowIndex || 0) < index - 1) {
        return <View key={index} style={{ width: screenWidth, height: screenHeight }} />
      }

      if (!this.handleLongPressWithIndex.has(index)) {
        this.handleLongPressWithIndex.set(index, this.handleLongPress.bind(this, image))
      }

      let width = this.state.imageSizes[index] && this.state.imageSizes[index].width
      let height = this.state.imageSizes[index] && this.state.imageSizes[index].height
      const imageInfo = this.state.imageSizes[index]

      if (!imageInfo || !imageInfo.status) {
        return <View key={index} style={{ width: screenWidth, height: screenHeight }} />
      }

      // 如果宽大于屏幕宽度,整体缩放到宽度是屏幕宽度
      if (width > screenWidth) {
        const widthPixel = screenWidth / width
        width *= widthPixel
        height *= widthPixel
      }

      // 如果此时高度还大于屏幕高度,整体缩放到高度是屏幕高度
      if (height > screenHeight) {
        const HeightPixel = screenHeight / height
        width *= HeightPixel
        height *= HeightPixel
      }

      const Wrapper = ({ children, ...others }) => (
        <ImageZoom
          cropWidth={this.width}
          cropHeight={this.height}
          maxOverflow={this.props.maxOverflow}
          horizontalOuterRangeOffset={this.handleHorizontalOuterRangeOffset}
          responderRelease={this.handleResponderRelease}
          onLongPress={this.handleLongPressWithIndex.get(index)}
          onClick={this.handleClick}
          onDoubleClick={this.handleDoubleClick}
          enableSwipeDown={this.props.enableSwipeDown}
          swipeDownThreshold={this.props.swipeDownThreshold}
          onSwipeDown={this.handleSwipeDown}
          pinchToZoom={this.props.enableImageZoom}
          enableDoubleClickZoom={this.props.enableImageZoom}
          doubleClickInterval={this.props.doubleClickInterval}
          {...others}
        >
          {children}
        </ImageZoom>
      )

      switch (imageInfo.status) {
        case 'loading':
          return (
            <Wrapper
              key={index}
              style={{
                ...this.styles.modalContainer,
                ...this.styles.loadingContainer
              }}
              imageWidth={screenWidth}
              imageHeight={screenHeight}
            >
              <View style={this.styles.loadingContainer}>{this.props.loadingRender()}</View>
            </Wrapper>
          )
        case 'success':
          if (!image.props) {
            image.props = {}
          }

          if (!image.props.style) {
            image.props.style = {}
          }
          image.props.style = {
            ...this.styles.imageStyle, // User config can override above.
            ...image.props.style,
            width,
            height
          }

          if (typeof image.props.source === 'number') {
            // source = require(..), doing nothing
          } else {
            if (!image.props.source) {
              image.props.source = {}
            }
            image.props.source = {
              uri: image.url,
              ...image.props.source
            }
          }
          if (this.props.enablePreload) {
            this.preloadImage(this.state.currentShowIndex || 0)
          }
          return (
            <ImageZoom
              key={index}
              ref={el => (this.imageRefs[index] = el)}
              cropWidth={this.width}
              cropHeight={this.height}
              maxOverflow={this.props.maxOverflow}
              horizontalOuterRangeOffset={this.handleHorizontalOuterRangeOffset}
              responderRelease={this.handleResponderRelease}
              onLongPress={this.handleLongPressWithIndex.get(index)}
              onClick={this.handleClick}
              onDoubleClick={this.handleDoubleClick}
              imageWidth={width}
              imageHeight={height}
              enableSwipeDown={this.props.enableSwipeDown}
              swipeDownThreshold={this.props.swipeDownThreshold}
              onSwipeDown={this.handleSwipeDown}
              pinchToZoom={this.props.enableImageZoom}
              enableDoubleClickZoom={this.props.enableImageZoom}
              doubleClickInterval={this.props.doubleClickInterval}
            >
              {this.props.renderImage(image.props)}
            </ImageZoom>
          )
        case 'fail':
          return (
            <Wrapper
              key={index}
              style={this.styles.modalContainer}
              imageWidth={this.props.failImageSource ? this.props.failImageSource.width : screenWidth}
              imageHeight={this.props.failImageSource ? this.props.failImageSource.height : screenHeight}
            >
              {this.props.failImageSource &&
                this.props.renderImage({
                  source: {
                    uri: this.props.failImageSource.url
                  },
                  style: {
                    width: this.props.failImageSource.width,
                    height: this.props.failImageSource.height
                  }
                })}
            </Wrapper>
          )
      }
    })

    return (
      <Animated.View style={{ zIndex: 9 }}>
        <Animated.View style={{ ...this.styles.container, opacity: this.fadeAnim }}>
          {this.props.renderHeader(this.state.currentShowIndex)}

          <View style={this.styles.arrowLeftContainer}>
            <TouchableWithoutFeedback onPress={this.goBack}>
              <View>{this.props.renderArrowLeft()}</View>
            </TouchableWithoutFeedback>
          </View>

          <View style={this.styles.arrowRightContainer}>
            <TouchableWithoutFeedback onPress={this.goNext}>
              <View>{this.props.renderArrowRight()}</View>
            </TouchableWithoutFeedback>
          </View>

          <Animated.View
            style={{
              ...this.styles.moveBox,
              transform: [{ translateX: this.positionX }],
              width: this.width * this.props.imageUrls.length
            }}
          >
            {ImageElements}
          </Animated.View>
          {this.props.renderIndicator((this.state.currentShowIndex || 0) + 1, this.props.imageUrls.length)}

          {this.props.imageUrls[this.state.currentShowIndex || 0] &&
            this.props.imageUrls[this.state.currentShowIndex || 0].originSizeKb &&
            this.props.imageUrls[this.state.currentShowIndex || 0].originUrl && (
            <View style={this.styles.watchOrigin}>
              <TouchableOpacity style={this.styles.watchOriginTouchable}>
                <Text style={this.styles.watchOriginText}>查看原图(2M)</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </Animated.View>
    )
  }

  /**
   * 保存当前图片到本地相册
   */
  saveToLocal = () => {
    if (!this.props.onSave) {
      CameraRoll.saveToCameraRoll(this.props.imageUrls[this.state.currentShowIndex || 0].url)
      this.props.onSaveToCamera(this.state.currentShowIndex)
    } else {
      this.props.onSave(this.props.imageUrls[this.state.currentShowIndex || 0].url)
    }

    this.setState({ isShowMenu: false })
  }

  getMenu () {
    if (!this.state.isShowMenu) {
      return null
    }

    return (
      <View style={this.styles.menuContainer}>
        <View style={this.styles.menuShadow} />
        <View style={this.styles.menuContent}>
          <TouchableHighlight underlayColor='#F2F2F2' onPress={this.saveToLocal} style={this.styles.operateContainer}>
            <Text style={this.styles.operateText}>{this.props.menuContext.saveToLocal}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor='#F2F2F2'
            onPress={this.handleLeaveMenu}
            style={this.styles.operateContainer}
          >
            <Text style={this.styles.operateText}>{this.props.menuContext.cancel}</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  handleLeaveMenu = () => {
    this.setState({ isShowMenu: false })
  }

  handleSwipeDown = () => {
    if (this.props.onSwipeDown) {
      this.props.onSwipeDown()
    }
    this.handleCancel()
  }

  render () {
    let childs = null

    childs = (
      <View>
        {this.getContent()}
        {this.getMenu()}
      </View>
    )
    return (
      <View
        onLayout={this.handleLayout}
        style={{
          flex: 1,
          overflow: 'hidden',
          ...this.props.style
        }}
      >
        {childs}
      </View>
    )
  }
}

ImageViewer.defaultProps = {
  /**
   * 是否显示
   */
  show: false,

  /**
   * 图片数组
   */
  imageUrls: [],

  /**
   * 滑动到下一页的X阈值
   */
  flipThreshold: 80,

  /**
   * 当前页能滑到下一页X位置最大值
   */
  maxOverflow: 300,

  /**
   * 初始显示第几张图
   */
  index: 0,

  /**
   * 加载失败的图
   */
  failImageSource: undefined,

  /**
   * 背景颜色
   */
  backgroundColor: 'black',

  /**
   * style props for the footer container
   */
  footerContainerStyle: {},

  /**
   * Menu Context Values
   */
  menuContext: { saveToLocal: 'save to the album', cancel: 'cancel' },

  /**
   * 是否开启长按保存到本地的功能
   */
  saveToLocalByLongPress: true,

  /**
   * 是否允许缩放图片
   */
  enableImageZoom: true,

  style: {},

  /**
   * Enable swipe down to close image viewer.
   * When swipe down, will trigger onCancel.
   */
  enableSwipeDown: false,

  /**
   * 是否预加载图片
   */
  enablePreload: false,

  /**
   * 翻页时的动画时间
   */
  pageAnimateTime: 100,

  /**
   * 长按图片的回调
   */
  onLongPress: () => {
    //
  },

  /**
   * 单击回调
   */
  onClick: () => {
    //
  },

  /**
   * 双击回调
   */
  onDoubleClick: () => {
    //
  },

  /**
   * 图片保存到本地方法，如果写了这个方法，就不会调取系统默认方法
   * 针对安卓不支持 saveToCameraRoll 远程图片，可以在安卓调用此回调，调用安卓原生接口
   */
  onSave: () => {
    //
  },

  /**
   * 自定义头部
   */
  renderHeader: () => {
    return null
  },

  /**
   * 自定义尾部
   */
  renderFooter: () => {
    return null
  },

  /**
   * 自定义计时器
   */
  renderIndicator: (
    currentIndex,
    allSize
  ) => {
    return React.createElement(
      View,
      { style: simpleStyle.count },
      React.createElement(Text, { style: simpleStyle.countText }, currentIndex + '/' + allSize)
    )
  },

  /**
   * Render image component
   */
  renderImage: (props) => {
    return React.createElement(Image, props)
  },

  /**
   * 自定义左翻页按钮
   */
  renderArrowLeft: () => {
    return null
  },

  /**
   * 自定义右翻页按钮
   */
  renderArrowRight: () => {
    return null
  },

  /**
   * 弹出大图的回调
   */
  onShowModal: () => {
    //
  },

  /**
   * 取消看图的回调
   */
  onCancel: () => {
    //
  },

  /**
   * function that fires when user swipes down
   */
  onSwipeDown: () => {
    //
  },

  /**
   * 渲染loading元素
   */
  loadingRender: () => {
    return null
  },

  /**
   * 保存到相册的回调
   */
  onSaveToCamera: () => {
    //
  },

  /**
   * 当图片切换时触发
   */
  onChange: () => {
    //
  }
}

const simpleStyle = {
  count: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 38,
    zIndex: 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  countText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {
      width: 0,
      height: 0.5
    },
    textShadowRadius: 0
  }
}
