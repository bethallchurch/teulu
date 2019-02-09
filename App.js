import React from 'react'
import Amplify, { Hub } from 'aws-amplify'
import { Input, Button } from 'react-native-elements'
import { withAuthenticator } from 'aws-amplify-react-native'
import config from './aws-exports'
import AuthWatcher from '@auth/AuthWatcher'
import Profile from '@user/components/Profile'

Amplify.configure(config)

Hub.listen('auth', AuthWatcher)

class App extends React.Component {
  render () {
    return (
      <Profile />
    )
  }
}

export default withAuthenticator(App, includeGreetings = true)
