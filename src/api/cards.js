import axios from 'axios'

const baseUrl = '/api/cards'

function getTokenConfig() {
  const tokenRaw = localStorage.getItem('token')
  return { headers: { Authorization: `Bearer ${tokenRaw}` } }
}

async function createCard(blogObj) {
  const res = await axios.post(baseUrl, blogObj, getTokenConfig())
  return res.data
}

async function renameCard(id, blogObj) {
  const res = await axios.patch(`${baseUrl}/${id}/title`, blogObj, getTokenConfig())
  return res.data
}

async function dragCard(id, blogObj) {
  const res = await axios.patch(`${baseUrl}/${id}/drag`, blogObj, getTokenConfig())
  return res.data
}

async function deleteCard(id) {
  await axios.delete(`${baseUrl}/${id}`, getTokenConfig())
}

export default { createCard, renameCard, dragCard, deleteCard }
