import { chunk } from '@global/helpers'

export const fade = (hexStr, opacity) => {
  let hex = hexStr[0] === '#' ? hexStr.slice(1) : hexStr
  const rgb = chunk(hex, 2)
    .map(n => n.length === 1 ? n + n : n)
    .map(n => parseInt(n, 16))
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${opacity})`
}
