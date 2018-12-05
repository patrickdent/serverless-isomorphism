import React from 'react'
import { render, hydrate } from 'react-dom'
import { Todos } from './components/Todos'
import { TodoState } from './state/TodoState'

// Retrieve and decode initial state from LocalStorage and build stores.
const rehydrateState = () => {
  const encodedState = window.localStorage.getItem('state')
  const initialStateString = Buffer.from(encodedState, 'base64').toString()
  const initialStateObject = JSON.parse(initialStateString)
  return new TodoState(initialStateObject)
}
const state = rehydrateState()

hydrate(<Todos state={state} />, document.getElementById('container'))
