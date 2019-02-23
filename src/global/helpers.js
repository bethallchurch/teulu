import { API, graphqlOperation } from 'aws-amplify'

export const union = (a, b) => [ ...new Set([ ...a, ...b ]) ]

export const intersection = (a, b) => {
  const setB = new Set(b)
  return [ ...new Set(a) ].filter(x => setB.has(x))
}

export const createQuery = (query, input) => API.graphql(graphqlOperation(query, input))
