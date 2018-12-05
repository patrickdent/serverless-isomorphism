import React from 'react'
import { render, hydrate } from 'react-dom'
import { Todos } from './components/Todos'
import { TodoState } from './state/TodoState'

const state = new TodoState([{
  todo: 'build an isomorphic app',
  complete: false
}])

hydrate(<Todos state={state} />, document.getElementById('container'))
