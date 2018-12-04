import React from 'react'

import { Todos } from './Todos'

export default function App (props) {
  const { state } = props

  return (
    <Todos todos={state.todos} />
  )
}
