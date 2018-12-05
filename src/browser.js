import React from 'react'
import { render, hydrate } from 'react-dom'
import App from './components/App'
import { TodoState } from './state/TodoState'

const state = new TodoState([{
  todo: 'build an isomorphic app',
  complete: false
}])

hydrate(<App state={state} />, document.getElementById('container'))
