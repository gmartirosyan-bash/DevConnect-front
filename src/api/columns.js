import axios from 'axios'

const baseUrl = '/api/columns'

function getTokenConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } }
}

async function createColumn(blogObj, token) {
  const res = await axios.post(baseUrl, blogObj, getTokenConfig(token))
  return res.data
}

async function renameColumn(id, blogObj, token) {
  const res = await axios.patch(`${baseUrl}/${id}`, blogObj, getTokenConfig(token))
  return res.data
}

async function deleteColumn(id, token) {
  await axios.delete(`${baseUrl}/${id}`, getTokenConfig(token))
}

export default { createColumn, renameColumn, deleteColumn }
