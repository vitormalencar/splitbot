import crypto from 'crypto'
import timingSafeCompare from 'tsscmp'

export const isVerified = (req, res, next) => {
  let validUser = false
  const signature = req.headers['x-slack-signature']
  const timestamp = req.headers['x-slack-request-timestamp']
  const hmac = crypto.createHmac('sha256', process.env.SLACK_SIGNING_SECRET)

  const fiveMinutesAgo = ~~(Date.now() / 1000) - 60 * 5

  const isOld = timestamp < fiveMinutesAgo

  if (signature !== undefined && !isOld) {
    const [version, hash] = signature.split('=')
    // Check if the timestamp is too old
    hmac.update(`${version}:${timestamp}:${req.rawBody}`)
    validUser = timingSafeCompare(hmac.digest('hex'), hash)
  }
  return validUser ? next() : res.status(404).send('Not valid request')
}
