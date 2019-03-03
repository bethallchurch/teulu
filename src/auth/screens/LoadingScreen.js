import React, { Component } from 'react'
import { APP, AUTH } from '@navigation/routes'
import { getAuthUser } from '@auth/AuthService'
import { Loading } from '@global/components'

export default class AuthLoading extends Component {
  state = { userToken: null }

  async componentDidMount () {
    await this.loadApp()
  }

  loadApp = async () => {
    try {
      const user = await getAuthUser()
      this.setState({ userToken: user.signInUserSession.accessToken.jwtToken })
    } catch (error) {
      console.log(error)
    }
    this.props.navigation.navigate(this.state.userToken ? APP : AUTH)
  }

  render () {
    return <Loading />
  }
}
