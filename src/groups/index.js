import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import config from './aws-exports'
import { Input, Button } from 'react-native-elements'
import { listTodos } from './src/graphql/queries'

Amplify.configure(config)


class App extends React.Component {
  state = { todos: [] }

  async componentDidMount () {
    const todoData = await API.graphql(graphqlOperation(listTodos))
    this.setState({ todos: todoData.data.listTodos.items })
  }
  
  render () {
    return (
      <View>
        {this.state.todos.map(({ id, name, description }) => {
          return <Text key={id}>{name}: {description}</Text>
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({})

export default App
