import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Overlay, Text } from '@global/components'
import { ConnectedSelectGroupList as SelectGroupList } from '@group/components/GroupList'
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
    const { selectedGroupId, children } = this.props
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
              rightIcon={rightIconConfig(!selectedGroupId)}
            />
            <SelectGroupList
              onPressItem={this.onSelectGroup}
              selectedGroupId={selectedGroupId}
            />
          </View>
        </Overlay>
      </>
    )
  }
}

const rightIconConfig = selected => selected ? ({
  name: 'check', color: colors.primary
}) : null

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
    marginTop: layout.s6
  },
  overlayTitle: {
    marginBottom: layout.s5,
    marginHorizontal: layout.s3
  },
  deselectContainer: {
    paddingVertical: layout.s4,
    marginHorizontal: layout.s3,
    marginBottom: layout.s3
  }
})
