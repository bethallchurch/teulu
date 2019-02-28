import { API, graphqlOperation } from 'aws-amplify'

export const union = (a, b) => [ ...new Set([ ...a, ...b ]) ]

export const intersection = (a, b) => {
  const setB = new Set(b)
  return [ ...new Set(a) ].filter(x => setB.has(x))
}

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

export const chunk = (arr, size) => {
  let chunked = []
  for (let i = 0; i < arr.length; i += size) {
    chunked.push(arr.slice(i, i + size))
  }
  return chunked
}

export const createQuery = (query, input) => API.graphql(graphqlOperation(query, input))
