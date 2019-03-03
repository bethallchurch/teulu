import React, { Component } from 'react'
import { SafeAreaView, View, StyleSheet } from 'react-native'
import { getAuthUser } from '@auth/AuthService'
import { Avatar, ListItem } from 'react-native-elements'
import { colors } from '@global/styles'
import * as routes from '@navigation/routes'
import { LogOutButton } from '@auth/components'
import { Text } from '@global/components'

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
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: 'center', paddingVertical: 32 }}>
          <Avatar
            rounded
            icon={{ name: 'person' }}
            size='large'
            titleStyle={{ color: colors.backgroundPrimary }}
            overlayContainerStyle={{ backgroundColor: colors.textDefault }}
          />
        </View>
        <View style={{ justifyContent: 'space-between', flex: 1 }}>
          <View>
            <ListItem
              title={<Text subtitleOne>{phoneNumber}</Text>}
              bottomDivider
              rightIcon={this.chevronProps}
              leftIcon={{ name: 'smartphone' }}
              onPress={() => navigate(routes.RESET_PHONE_NUMBER)}
            />
            <ListItem
              title={<Text subtitleOne>Notifications</Text>}
              bottomDivider
              rightIcon={this.chevronProps}
              leftIcon={{ name: 'notifications-none' }}
              onPress={() => navigate(routes.NOTIFICATION_SETTINGS)}
            />
            <ListItem
              title={<Text subtitleOne>Reset Password</Text>}
              rightIcon={this.chevronProps}
              leftIcon={{ name: 'lock-outline' }}
              onPress={() => navigate(routes.RESET_PASSWORD)}
            />
          </View>
          <LogOutButton navigation={this.props.navigation} />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground
  }
})
