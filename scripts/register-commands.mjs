import process from 'node:process'

import 'dotenv/config'

const { APPLICATION_ID, SECRET_TOKEN } = process.env

if (!APPLICATION_ID || !SECRET_TOKEN)
  throw new Error('Missing environment variables')

const url = `https://discord.com/api/v10/applications/${APPLICATION_ID}/commands`

const commands = [
  {
    name: 'chirp',
    description: "don't do it",
    type: 1,
  }
]

console.log('Overwriting commands for', APPLICATION_ID)

const response = await fetch(url, {
  method: 'PUT',
  headers: {
    Authorization: `Bot ${SECRET_TOKEN}`,
    'Content-Type': 'application/json; charset=UTF-8',
  },
  body: JSON.stringify(commands),
})

if (!response.ok)
  throw new Error(`Failed to register commands: ${response.statusText}`)

const data = await response.json()
console.log('Commands registered', data)
