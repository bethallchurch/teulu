import { getAuthUser, createUser, confirmUser } from '@user/UserService'

const SIGN_IN = 'signIn'
const SIGN_UP = 'signUp'
const SIGN_OUT = 'signOut'
const SIGN_IN_FAIL = 'signIn_failure'
const CONFIGURED = 'configured'

const AuthWatcher = {}

AuthWatcher.onHubCapsule = async ({ payload: { event, data } }) => {
  switch (event) {
    case SIGN_UP:
      try {
        const input = { cognitoId: data.userSub, username: data.user.username, confirmed: false }
        const newUser = await createUser(input)
        console.log('Successfully created new user!', newUser)
      } catch (error) {
        console.log('Error creating new user:', error)
      }
      break
    case SIGN_IN:
      try {
        const authUser = await getAuthUser()
        const cognitoId = authUser.attributes.sub
        const phoneNumber = authUser.attributes.phone_number
        const user = await confirmUser({ cognitoId, phoneNumber })
        console.log('Successfully confirmed user!', user)
      } catch (error) {
        console.log('Error confirming user:', error)
      }
      break
  }
}

export default AuthWatcher
