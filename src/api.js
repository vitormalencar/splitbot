import axios from 'axios'
import qs from 'querystring'

const apiUrl = 'https://slack.com/api'

const callAPIMethod = async (method, payload) => {
  let data = Object.assign({ token: process.env.SLACK_ACCESS_TOKEN }, payload)
  let result = await axios.post(`${apiUrl}/${method}`, qs.stringify(data))
  return result.data
}

export default {
  callAPIMethod,
}
