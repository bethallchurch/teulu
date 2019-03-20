import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { ListItem, Divider } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Overlay, Text } from '@global/components'
import GroupList from '@group/components/GroupList'
import { colors, layout } from '@global/styles'

export default class SelectGroupDropdown extends Component {
  state = { isOpen: false }

  open = () => this.setState({ isOpen: true })
  close = () => this.setState({ isOpen: false })

  onSelectGroup = group => {
    const { closeOnSelect = false, onSelectGroup } = this.props
    onSelectGroup(group)
    closeOnSelect && this.close()
  }

  render () {
    const { isOpen } = this.state
    const { navigation, selectedGroupId, children } = this.props
    return (
      <>
        <TouchableOpacity style={styles.touchable} onPress={this.open}>
          <View style={styles.select}>
            <Text bodyOne>{children || 'None'}</Text>
            <MaterialCommunityIcons name='chevron-down' color={colors.textDefault} size={layout.s4} />
          </View>
        </TouchableOpacity>
        <Overlay
          isOpen={isOpen}
          close={this.close}
          iconColor={colors.textDefault}
          backgroundColor={colors.primaryBackground}
        >
          <View style={styles.overlayContentContainer}>
            <Text h4 style={styles.overlayTitle}>Select Group</Text>
            <ListItem
              title={<Text subtitleOne>None</Text>}
              onPress={() => this.onSelectGroup({})}
              containerStyle={styles.deselectContainer}
              rightIcon={rightIcon(!selectedGroupId)}
            />
            <Divider style={styles.divider} />
            <GroupList
              compact
              selectable
              navigation={navigation}
              onPressItem={this.onSelectGroup}
              selectedGroupId={selectedGroupId}
            />
          </View>
        </Overlay>
      </>
    )
  }
}

const rightIcon = selected => ({
  name: selected ? 'check-box' : 'check-box-outline-blank',
  color: selected ? colors.primary : colors.textDefault
})

const styles = StyleSheet.create({
  touchable: {
    width: '100%'
  },
  select: {
    width: '100%',
    padding: layout.s3,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: colors.textLight,
    justifyContent: 'space-between',
    borderWidth: StyleSheet.hairlineWidth
  },
  overlayContentContainer: {
    flex: 1,
    marginTop: layout.s6,
    marginHorizontal: layout.s3
  },
  overlayTitle: {
    marginBottom: layout.s5
  },
  deselectContainer: {
    paddingVertical: layout.s4
  },
  divider: {
    backgroundColor: colors.textLight
  }
})
