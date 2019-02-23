import { StyleSheet } from 'react-native'

// Colours

export const colors = {
  textDefault: '#555',
  textLight: '#aaa',
  primary: '#6fcea1',
  secondary: '#3498db',
  primaryBackground: '#f6f7f6',
  secondaryBackground: '#ffffff'
}

// Typography

export const f1 = { fontSize: 36 }
export const f2 = { fontSize: 24 }
export const f3 = { fontSize: 20 }
export const f4 = { fontSize: 16 }
export const f5 = { fontSize: 14 }
export const f6 = { fontSize: 12 }

export const measure = { maxWidth: 480 }
export const measureWide = { maxWidth: 544 }
export const measureNarrow = { maxWidth: 320 }

export const lhSolid = fs => ({ lineHeight: fs * 1 })
export const lhTitle = fs => ({ lineHeight: fs * 1.25 })
export const lhCopy = fs => ({ lineHeight: fs * 1.5 })

export const fDefault = { fontFamily: 'OpenSans-Regular' }
export const fBold = { fontFamily: 'OpenSans-Bold' }
export const fItalic = { fontFamily: 'OpenSans-Italic' }

export const tl = { textAlign: 'left' }
export const tr = { textAlign: 'right' }
export const tc = { textAlign: 'center' }
export const tj = { textAlign: 'justify' }

// Spacing

export const s0 = 0
export const s1 = 4
export const s2 = 8
export const s3 = 16
export const s4 = 32
export const s5 = 64

export const ma0 = { margin: s0 }
export const ma1 = { margin: s1 }
export const ma2 = { margin: s2 }
export const ma3 = { margin: s3 }
export const ma4 = { margin: s4 }
export const ma5 = { margin: s5 }

export const mh0 = { marginHorizontal: s0 }
export const mh1 = { marginHorizontal: s1 }
export const mh2 = { marginHorizontal: s2 }
export const mh3 = { marginHorizontal: s3 }
export const mh4 = { marginHorizontal: s4 }
export const mh5 = { marginHorizontal: s5 }

export const mv0 = { marginVertical: s0 }
export const mv1 = { marginVertical: s1 }
export const mv2 = { marginVertical: s2 }
export const mv3 = { marginVertical: s3 }
export const mv4 = { marginVertical: s4 }
export const mv5 = { marginVertical: s5 }

export const mt0 = { marginTop: s0 }
export const mt1 = { marginTop: s1 }
export const mt2 = { marginTop: s2 }
export const mt3 = { marginTop: s3 }
export const mt4 = { marginTop: s4 }
export const mt5 = { marginTop: s5 }

export const mr0 = { marginRight: s0 }
export const mr1 = { marginRight: s1 }
export const mr2 = { marginRight: s2 }
export const mr3 = { marginRight: s3 }
export const mr4 = { marginRight: s4 }
export const mr5 = { marginRight: s5 }

export const mb0 = { marginBottom: s0 }
export const mb1 = { marginBottom: s1 }
export const mb2 = { marginBottom: s2 }
export const mb3 = { marginBottom: s3 }
export const mb4 = { marginBottom: s4 }
export const mb5 = { marginBottom: s5 }

export const ml0 = { marginLeft: s0 }
export const ml1 = { marginLeft: s1 }
export const ml2 = { marginLeft: s2 }
export const ml3 = { marginLeft: s3 }
export const ml4 = { marginLeft: s4 }
export const ml5 = { marginLeft: s5 }

export const pa0 = { padding: s0 }
export const pa1 = { padding: s1 }
export const pa2 = { padding: s2 }
export const pa3 = { padding: s3 }
export const pa4 = { padding: s4 }
export const pa5 = { padding: s5 }

export const ph0 = { paddingHorizontal: s0 }
export const ph1 = { paddingHorizontal: s1 }
export const ph2 = { paddingHorizontal: s2 }
export const ph3 = { paddingHorizontal: s3 }
export const ph4 = { paddingHorizontal: s4 }
export const ph5 = { paddingHorizontal: s5 }

export const pv0 = { paddingVertical: s0 }
export const pv1 = { paddingVertical: s1 }
export const pv2 = { paddingVertical: s2 }
export const pv3 = { paddingVertical: s3 }
export const pv4 = { paddingVertical: s4 }
export const pv5 = { paddingVertical: s5 }

export const pt0 = { paddingTop: s0 }
export const pt1 = { paddingTop: s1 }
export const pt2 = { paddingTop: s2 }
export const pt3 = { paddingTop: s3 }
export const pt4 = { paddingTop: s4 }
export const pt5 = { paddingTop: s5 }

export const pr0 = { paddingRight: s0 }
export const pr1 = { paddingRight: s1 }
export const pr2 = { paddingRight: s2 }
export const pr3 = { paddingRight: s3 }
export const pr4 = { paddingRight: s4 }
export const pr5 = { paddingRight: s5 }

export const pb0 = { paddingBottom: s0 }
export const pb1 = { paddingBottom: s1 }
export const pb2 = { paddingBottom: s2 }
export const pb3 = { paddingBottom: s3 }
export const pb4 = { paddingBottom: s4 }
export const pb5 = { paddingBottom: s5 }

export const pl0 = { paddingLeft: s0 }
export const pl1 = { paddingLeft: s1 }
export const pl2 = { paddingLeft: s2 }
export const pl3 = { paddingLeft: s3 }
export const pl4 = { paddingLeft: s4 }
export const pl5 = { paddingLeft: s5 }

// Widths

export const w1 = { width: 4 }
export const w2 = { width: 8 }
export const w3 = { width: 16 }
export const w4 = { width: 24 }
export const w5 = { width: 32 }
export const w6 = { width: 40 }

export const w10Pc = { width: '10%' }
export const w20Pc = { width: '20%' }
export const w25Pc = { width: '25%' }
export const w30Pc = { width: '30%' }
export const w33Pc = { width: '33%' }
export const w34Pc = { width: '34%' }
export const w40Pc = { width: '40%' }
export const w50Pc = { width: '50%' }
export const w60Pc = { width: '60%' }
export const w70Pc = { width: '70%' }
export const w75Pc = { width: '75%' }
export const w80Pc = { width: '80%' }
export const w90Pc = { width: '90%' }
export const w100Pc = { width: '100%' }

// Border Radius

export const br100 = { borderRadius: 100 }

// Components

export const titleStyle = StyleSheet.create({
  style: {
    color: colors.textDefault,
    ...fBold,
    ...f1,
    ...lhTitle(f1.fontSize),
    ...mb4,
    ...measureWide,
    ...w100Pc,
    ...tl
  }
})

export const copyStyle = StyleSheet.create({
  style: {
    color: colors.textDefault,
    ...fDefault,
    ...f4
  }
})

export const textInputStyle = StyleSheet.create({
  input: {
    color: colors.textDefault,
    ...fDefault,
    ...f4
  },
  inputContainer: {
    paddingHorizontal: 0,
    ...mb3
  },
  inputInputContainer: {
    borderBottomColor: colors.textLight
  }
})

export const phoneInputStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    ...w100Pc
  },
  icon: {
    color: colors.textDefault,
    paddingTop: 2
  },
  textInputContainer: {
    flex: 1
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: colors.textLight,
    flexDirection: 'row',
    alignItems: 'center',
    ...pl1,
    ...pr2,
    paddingTop: 6,
    paddingBottom: 7,
    ...mr2
  }
})

export const buttonStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    ...pa3,
    ...w100Pc
  },
  text: {
    color: colors.primaryBackground,
    ...f4,
    ...fBold
  }
})

export const linkStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    ...w100Pc,
    ...mt2
  },
  link: {
    color: colors.secondary,
    ...f5,
    ...pv2
  }
})
