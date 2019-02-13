import { userInit } from '@user/UserService'

const SIGN_IN = 'signIn'
const SIGN_UP = 'signUp'
const SIGN_OUT = 'signOut'
const SIGN_IN_FAIL = 'signIn_failure'
const CONFIGURED = 'configured'

const AuthWatcher = {}

AuthWatcher.onHubCapsule = async ({ payload: { event, data } }) => {
  switch (event) {
    case SIGN_IN:
      userInit()
      break
  }
}

export default AuthWatcher
