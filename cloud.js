import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App/components/App";

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
</body>
</html>
`

const state = {
  todos: [{
    todo: 'build an isomorphic app',
    complete: false
  }],
  updateTodo: () => console.log('update'),
  addTodo: () => console.log('add'),
  clearComplete: () => console.log('clear')
}

export const render = (req, res) => {
  const html = ReactDOMServer.renderToString(<App state={state} />);

  return res.send(
    htmlData.replace('<div id="container"></div>', `<div id="container">${html}</div>`)
  )
}
