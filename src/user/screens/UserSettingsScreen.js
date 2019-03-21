import React, { Component } from 'react'
import { View } from 'react-native'
import { getAuthUser } from '@auth/AuthService'
import { Avatar, ListItem } from 'react-native-elements'
import * as routes from '@navigation/routes'
import { LogOutButton } from '@auth/components'
import { ScreenBase, Text } from '@global/components'
import { colors, layout } from '@global/styles'

export default class UserSettingsScreen extends Component {
  state = { phoneNumber: '' }

  async componentDidMount () {
    const { attributes: { phone_number } } = await getAuthUser() // eslint-disable-line camelcase
    this.setState({ phoneNumber: phone_number }) // eslint-disable-line camelcase
  }

  get chevronProps () {
    return { name: 'chevron-right', color: colors.textLight }
  }

  render () {
    const { phoneNumber } = this.state
    const { navigation: { navigate } } = this.props
    return (
      <ScreenBase headerVisible={false}>
        <View style={{ alignItems: 'center', paddingVertical: layout.s5 }}>
          <Avatar
            rounded
            icon={{ name: 'person', color: colors.backgroundPrimary }}
            size='large'
            titleStyle={{ color: colors.backgroundPrimary }}
            overlayContainerStyle={{ backgroundColor: colors.textDefault }}
          />
        </View>
        <View style={{ justifyContent: 'flex-start', flex: 1 }}>
          <ListItem
            title={<Text subtitleOne>{phoneNumber}</Text>}
            bottomDivider
            rightIcon={this.chevronProps}
            leftIcon={{ name: 'smartphone', color: colors.textDefault }}
            onPress={() => navigate(routes.RESET_PHONE_NUMBER)}
          />
          <ListItem
            title={<Text subtitleOne>Notifications</Text>}
            bottomDivider
            rightIcon={this.chevronProps}
            leftIcon={{ name: 'notifications-none', color: colors.textDefault }}
            onPress={() => navigate(routes.NOTIFICATION_SETTINGS)}
          />
          <ListItem
            title={<Text subtitleOne>Reset Password</Text>}
            rightIcon={this.chevronProps}
            leftIcon={{ name: 'lock-outline', color: colors.textDefault }}
            onPress={() => navigate(routes.RESET_PASSWORD)}
            bottomDivider
          />
          <LogOutButton navigation={this.props.navigation} />
        </View>
      </ScreenBase>
    )
  }
}
