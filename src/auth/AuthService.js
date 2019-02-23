import { Auth } from 'aws-amplify'

export const getAuthUser = () => Auth.currentAuthenticatedUser()
export const signUp = ({ username, password, attributes }) => Auth.signUp({ username, password, attributes })
export const signIn = ({ phoneNumber, password }) => Auth.signIn(phoneNumber, password)
export const signOut = () => Auth.signOut()
export const resendSignUp = ({ username }) => Auth.resendSignUp(username)
export const confirmSignUp = ({ username, verificationCode }) => Auth.confirmSignUp(username, verificationCode)
export const forgotPassword = ({ phoneNumber }) => Auth.forgotPassword(phoneNumber)
export const forgotPasswordSubmit = ({ phoneNumber, verificationCode, newPassword }) => (
  Auth.forgotPasswordSubmit(phoneNumber, verificationCode, newPassword)
)
export const changePassword = ({ user, oldPassword, newPassword }) => Auth.changePassword(user, oldPassword, newPassword)
export const updateUserAttributes = ({ user, attributes }) => Auth.updateUserAttributes(user, attributes)
export const verifyCurrentUserAttributeSubmit = ({ attribute, verificationCode }) => (
  Auth.verifyCurrentUserAttributeSubmit(attribute, verificationCode)
)

