// TODO: Use grid values
export const s0 = 0
export const s1 = 4
export const s2 = 8
export const s3 = 16
export const s4 = 24
export const s5 = 32
export const s6 = 40
export const s7 = 64

// 8dp grid (spacing & layout)
export const g0 = 0
export const g1 = 8
export const g2 = 16
export const g3 = 24
export const g4 = 32
export const g5 = 40
export const g6 = 48
export const g7 = 56
export const g8 = 64
export const g9 = 72
export const g10 = 80

// 4dp grid (iconography & typography)
export const sg0 = 0
export const sg1 = 4
export const sg2 = 8
export const sg3 = 12
export const sg4 = 16
export const sg5 = 20
export const sg6 = 24
export const sg7 = 28
export const sg8 = 32
export const sg9 = 36
export const sg10 = 40
export const sg11 = 44
export const sg12 = 48
export const sg13 = 52
export const sg14 = 56
export const sg15 = 60
export const sg16 = 64
export const sg17 = 68
export const sg18 = 72
export const sg19 = 76
export const sg20 = 80

export const breakpoints = {
  xs: x => x <= 599,
  s: x => x >= 600 && x <= 1023,
  m: x => x >= 1024 && x <= 1439,
  l: x => x >= 1440 && x <= 1919,
  xl: x => x >= 1920
}

// Aspect ratios (x: width; result: height)
export const r16to9 = x => x * (9 / 16)
export const r3to2 = x => x * (2 / 3)
export const r4to3 = x => x * (3 / 4)
export const r1to1 = x => x
export const r3to4 = x => x * (4 / 3)
export const r2to3 = x => x * (3 / 2)
