import { StyleSheet } from 'react-native'

export const grey = '#555'
export const lightGrey = '#aaa'
export const green = '#6fcea1'
export const offWhite = '#f6f7f6'

export const fm = 16

export const textColor = grey

export const font = 'OpenSans'
export const fontBold = 'OpenSans-Bold'

export const textInputStyles = StyleSheet.create({
  input: {
    fontFamily: font,
    fontSize: fm,
    color: textColor
  },
  inputContainer: {
    paddingHorizontal: 0,
    marginBottom: 16
  },
  inputInputContainer: {
    borderBottomColor: lightGrey
  }
})

export const phoneInputStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%'
  },
  text: {
    fontFamily: font,
    fontSize: 16,
    color: textColor
  },
  icon: {
    color: grey,
    paddingTop: 2
  },
  textInputContainer: {
    flex: 1
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: lightGrey,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
    paddingRight: 8,
    paddingTop: 6,
    paddingBottom: 7,
    marginRight: 8
  }
})

export const buttonStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: green,
    padding: 16,
    width: '100%'
  },
  text: {
    fontSize: 16,
    fontFamily: fontBold,
    color: offWhite
  }
})

export const linkStyles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  link: {
    fontSize: 14,
    color: '#3498db',
    paddingVertical: 8
  }
})
