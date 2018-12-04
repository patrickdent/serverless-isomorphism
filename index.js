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
export const render = (req, res) => {
  const html = ReactDOMServer.renderToString(<App />);

  return res.send(
    htmlData.replace('<div id="container"></div>', `<div id="container">${html}</div>`)
  )
}
