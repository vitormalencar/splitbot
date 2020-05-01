import api from './api'
import payloads from './payloads'

/*
 *  Send ticket creation confirmation via
 *  chat.postMessage to the user who created it
 */
export const sendConfirmation = async (ticket) => {
  // open a DM channel for that user
  const channel = await api.callAPIMethod('im.open', {
    user: ticket.userId,
  })

  const message = payloads.confirmation({
    channel_id: channel.channel.id,
    title: ticket.title,
    location: ticket.location,
    date: ticket.date,
  })

  const result = await api.callAPIMethod('chat.postMessage', message)
  debug('sendConfirmation: %o', result)
}

export const create = async (userId, view) => {
  let values = view.state.values

  let result = await api.callAPIMethod('users.info', {
    user: userId,
  })

  await sendConfirmation({
    userId,
    userEmail: result.user.profile.email,
    title: values.title_block.title.value,
    location: values.location_block.location.value,
    date: values.date_block.date.selected_date,
  })
}
