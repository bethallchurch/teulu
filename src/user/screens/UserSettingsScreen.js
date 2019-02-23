import React, { Component } from 'react'
import { SafeAreaView, Alert, View, Text, StyleSheet } from 'react-native'
import { getAuthUser } from '@auth/AuthService'
import { Avatar, ListItem } from 'react-native-elements'
import { grey, lightGrey, offWhite } from '@global/styles'
import * as routes from '@navigation/routes'
import LogOutButton from '@auth/components/LogOutButton'

export default class UserSettingsScreen extends Component {
  state = { phoneNumber: '' }

  async componentDidMount () {
    const { attributes: { phone_number } } = await getAuthUser()
    this.setState({ phoneNumber: phone_number })
  }

  get chevronProps () {
    return { name: 'chevron-right', color: lightGrey }
  }

  render () {
    const { phoneNumber } = this.state
    const { navigation: { navigate } } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: 'center', paddingVertical: 32 }}>
          <Avatar rounded icon={{ name: 'person' }} size='large' titleStyle={{ color: offWhite }} overlayContainerStyle={{ backgroundColor: grey }} />
        </View>
        <View style={{ justifyContent: 'space-between', flex: 1 }}>
          <View>
            <ListItem
              title={phoneNumber}
              titleStyle={styles.text}
              bottomDivider
              rightIcon={this.chevronProps}
              leftIcon={{ name: 'smartphone' }}
              onPress={() => navigate(routes.RESET_PHONE_NUMBER)}
            />
            <ListItem
              title='Notifications'
              titleStyle={styles.text}
              bottomDivider
              rightIcon={this.chevronProps}
              leftIcon={{ name: 'notifications-none' }}
              onPress={() => navigate(routes.NOTIFICATION_SETTINGS)}
            />
            <ListItem
              title='Reset Password'
              titleStyle={styles.text}
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
    backgroundColor: offWhite
  },
  text: {
    fontFamily: 'OpenSans',
    color: grey
  }
})
