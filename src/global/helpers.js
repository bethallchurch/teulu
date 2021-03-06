export { default as deepEqual } from 'deep-equal'

export const restrictRange = (x, min, max) => {
  if (x > max) return max
  if (x < min) return min
  return x
}

export const union = (a, b) => [ ...new Set([ ...a, ...b ]) ]

export const intersection = (a, b) => {
  const setB = new Set(b)
  return [ ...new Set(a) ].filter(x => setB.has(x))
}

export const difference = (a, b) => a.filter(x => !b.includes(x))

export const unique = arr => [ ...new Set(arr) ]

export const uniqueBy = (arr, key) => {
  let seen = {}
  let unique = []
  for (let i = 0; i < arr.length; i += 1) {
    let item = arr[i]
    let value = item[key]
    if (seen[value]) {
      continue
    } else {
      unique.push(item)
      seen[value] = true
    }
  }
  return unique
}

export const compact = arr => arr.filter(Boolean)

export const flatten = arrs => [].concat.apply([], arrs)

export const chunk = (x, size) => {
  let chunked = []
  for (let i = 0; i < x.length; i += size) {
    chunked.push(x.slice(i, i + size))
  }
  return chunked
}

export const isEmpty = obj => Object.entries(obj).length === 0 && obj.constructor === Object

export const arrayToObject = (arr, options = {}) => {
  const { setKey = item => item, setValue = () => null } = options
  return arr.reduce((obj, item) => {
    obj[setKey(item)] = setValue(item)
    return obj
  }, {})
}

export const objectFind = (obj, options = {}) => {
  const { callback = ([ _, value ]) => value } = options
  return (
    arrayToObject(Object.entries(obj).find(callback), {
      setKey: ([ key ]) => key,
      setValue: ([ _, value ]) => value
    })
  )
}

export const objectFilter = (obj, options = {}) => {
  const { callback = ([ _, value ]) => value } = options
  return (
    arrayToObject(Object.entries(obj).filter(callback), {
      setKey: ([ key ]) => key,
      setValue: ([ _, value ]) => value
    })
  )
}

export const withoutKeys = (obj, keys) => objectFilter(obj, {
  callback: ([ key ]) => !keys.includes(key)
})

export const cancellable = promise => {
  let cancelled = false
  const wrapped = new Promise((resolve, reject) => {
    promise.then(
      result => cancelled ? reject({ cancelled }) : resolve(result), // eslint-disable-line
      error => cancelled ? reject({ cancelled }) : reject(error) // eslint-disable-line
    )
  })
  return {
    promise: wrapped,
    cancel () {
      cancelled = true
    }
  }
}
