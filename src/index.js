import express from 'express'
import bodyParser from 'body-parser'
import { create } from './ticket'
import { isVerified } from './verifySignature'
import api from './api'
import payloads from './payloads'
import dotenv from 'dotenv'
import Debug from 'debug'

dotenv.config()
const debug = Debug('slash-command-template')


const app = express()

/*
 * Parse application/x-www-form-urlencoded && application/json
 * Use body-parser's `verify` callback to export a parsed raw body
 * that you need to use to verify the signature
 */

const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8')
  }
}

app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }))
app.use(bodyParser.json({ verify: rawBodyBuffer }))

app.get('/', (req, res) => {
  res.send(
    `<h2>The Slash Command and Dialog app is running</h2> <p>Follow the
    instructions in the README to configure the Slack App and your environment variables.</p>`
  )
})

/*
 * Endpoint to receive /helpdesk slash command from Slack.
 * Checks verification token and opens a dialog to capture more info.
 */
app.post('/command', isVerified, async (req, res) => {
  // extract the slash command text, and trigger ID from payload
  const { trigger_id } = req.body

  // create the modal payload - includes the dialog structure, Slack API token,
  // and trigger ID
  const view = payloads.modal({
    trigger_id,
  })

  const result = await api.callAPIMethod('views.open', view)

  debug('views.open: %o', result)
  return res.send('')
})

/*
 * Endpoint to receive the dialog submission. Checks the verification token
 * and creates a Helpdesk ticket
 */
app.post('/interactive', isVerified, async (req, res) => {
  const body = JSON.parse(req.body.payload)
  res.send('')
  create(body.user.id, body.view)
})

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(
    'Express server listening on port %d in %s mode',
    server.address().port,
    app.settings.env
  )
})
