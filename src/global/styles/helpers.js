import { chunk, restrictRange } from '@global/helpers'

export const fade = (hexStr, opacity) => {
  let hex = hexStr[0] === '#' ? hexStr.slice(1) : hexStr
  const rgb = chunk(hex, 2)
    .map(n => n.length === 1 ? n + n : n)
    .map(n => parseInt(n, 16))
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${opacity})`
}

export const lighten = (hexStr, amount) => {
  let hex = hexStr[0] === '#' ? hexStr.slice(1) : hexStr
  const num = parseInt(hex, 16)
  const r = restrictRange((num >> 16) + amount, 0, 255)
  const b = restrictRange(((num >> 8) & 0x00FF) + amount, 0, 255)
  const g = restrictRange((num & 0x0000FF) + amount, 0, 255)
  return `#${(g | (b << 8) | (r << 16)).toString(16)}`
}

export const darken = (hexStr, amount) => lighten(hexStr, amount * -1)
