import process from 'node:process'

import arc from '@architect/functions'
import { verifyKey, InteractionType, InteractionResponseType } from 'discord-interactions'

const { CLIENT_PUBLIC_KEY } = process.env

export const handler = arc.http(async function (req) {
  if (!CLIENT_PUBLIC_KEY) return { status: 500 }

  const { body, headers, rawBody } = req

  // Validate the request
  const { 'x-signature-ed25519': signature, 'x-signature-timestamp': timestamp } = headers
  const isValidRequest = verifyKey(rawBody, signature, timestamp, CLIENT_PUBLIC_KEY);
  if (!isValidRequest) return { status: 401 }

  const { type, id, data, member } = body
  if (!type) return { status: 400 }

  // Discord PING
  if (body.type === InteractionType.PING) return {
    json: { type: InteractionResponseType.PONG }
  }

  console.log('New Interaction', id, JSON.stringify(body, null, 2))

  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data
    console.log('Application Command', { name })

    switch (name) {
      case 'chirp':
        return {
          json: {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: { content: `@${member.user.username}, shush!` },
          },
        }
      default:
        console.log('Unknown command', name)
    }
  }

  return {
    json: {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: 'chirp!' },
    },
  }
}
)
