// Based on https://material.io/design/typography/the-type-system.html

import { StyleSheet } from 'react-native'
import { colors } from '@global/styles'

const { create, flatten } = StyleSheet

// Font families
export const fontLight = { fontFamily: 'OpenSans-Light' }
export const fontRegular = { fontFamily: 'OpenSans-Regular' }
export const fontMedium = { fontFamily: 'OpenSans-SemiBold' }

// Font sizes
const f1 = { fontSize: 96 }
const f2 = { fontSize: 60 }
const f3 = { fontSize: 48 }
const f4 = { fontSize: 34 }
const f5 = { fontSize: 24 }
const f6 = { fontSize: 20 }
const f7 = { fontSize: 16 }
const f8 = { fontSize: 14 }
const f9 = { fontSize: 12 }
const f10 = { fontSize: 10 }

// Casing
const uppercase = { textTransform: 'uppercase' }

// Letter spacing
const l1 = { letterSpacing: 1.5 }
const l2 = { letterSpacing: 1.25 }
const l3 = { letterSpacing: 0.5 }
const l4 = { letterSpacing: 0.4 }
const l5 = { letterSpacing: 0.25 }
const l6 = { letterSpacing: 0.15 }
const l7 = { letterSpacing: 0.1 }
const l8 = { letterSpacing: 0 }
const l9 = { letterSpacing: -0.5 }
const l10 = { letterSpacing: -1.5 }

// Colors
const colorDefault = { color: colors.textDefault }

// StyleSheet
const typography = (styles = {}) => create({
  h1: flatten([ fontLight, f1, l10, colorDefault, styles ]),
  h2: flatten([ fontLight, f2, l9, colorDefault, styles ]),
  h3: flatten([ fontRegular, f3, l8, colorDefault, styles ]),
  h4: flatten([ fontRegular, f4, l5, colorDefault, styles ]),
  h5: flatten([ fontRegular, f5, l8, colorDefault, styles ]),
  h6: flatten([ fontMedium, f6, l6, colorDefault, styles ]),
  subtitleOne: flatten([ fontRegular, f7, l6, colorDefault, styles ]),
  subtitleTwo: flatten([ fontMedium, f8, l7, colorDefault, styles ]),
  bodyOne: flatten([ fontRegular, f7, l3, colorDefault, styles ]),
  bodyTwo: flatten([ fontRegular, f8, l5, colorDefault, styles ]),
  button: flatten([ fontMedium, f8, l2, uppercase, colorDefault, styles ]),
  caption: flatten([ fontRegular, f9, l4, colorDefault, styles ]),
  overline: flatten([ fontRegular, f10, l1, uppercase, colorDefault, styles ])
})

export default typography
