import fs from 'fs'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './components/App'
import { TodoState } from './state/TodoState'

const htmlData = `
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Serverlessly Rendered</title>
</head>
<body>
    <div class="container">
      <div id="container"></div>
    </div>
    <script type="text/javascript" src="browser.js"></script>
</body>
</html>
`

const state = new TodoState([{
  todo: 'build an isomorphic app',
  complete: false
}])

const actions = {}

export const render = (req, res) => {
  const html = ReactDOMServer.renderToString(<App state={state}/>);

  return res.send(
    htmlData.replace('<div id="container"></div>', `<div id="container">${html}</div>`)
  )
}
