import axios from 'axios'

const baseUrl = '/api/cards'

function getTokenConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } }
}

async function createCard(blogObj, token) {
  const res = await axios.post(baseUrl, blogObj, getTokenConfig(token))
  return res.data
}

async function renameCard(id, blogObj, token) {
  const res = await axios.patch(`${baseUrl}/${id}/name`, blogObj, getTokenConfig(token))
  return res.data
}

async function dragCard(id, blogObj, token) {
  const res = await axios.patch(`${baseUrl}/${id}/drag`, blogObj, getTokenConfig(token))
  return res.data
}

async function deleteCard(id, token) {
  await axios.delete(`${baseUrl}/${id}`, getTokenConfig(token))
}

export default { createCard, renameCard, dragCard, deleteCard }
