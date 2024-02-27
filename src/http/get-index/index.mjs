import process from 'node:process'
import arc from '@architect/functions'

const { APPLICATION_ID } = process.env

export const handler = arc.http(async function() {
  if (!APPLICATION_ID) return {
    statusCode: 500,
    text: 'missing APPLICATION_ID',
  }

  return {
    html: /*html*/`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Canary Cowboy</title>
  <style>
     * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
     body {
      max-width: 350px;
      margin: 0 auto;
      padding-top: 5rem;
      text-align: center;
      font-family: system-ui, sans-serif;
    }
    a {
      text-decoration: none;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <img src="/_static/canary-cowboy.png" width="350px">
  <a href="https://discord.com/api/oauth2/authorize?client_id=${APPLICATION_ID}&permissions=51264&scope=bot">install</a>
</body>
</html>
`
  }
})
