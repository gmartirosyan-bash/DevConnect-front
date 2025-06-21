import axios from 'axios'

const baseUrl = '/api/columns'

function getTokenConfig() {
  const tokenRaw = localStorage.getItem('token')
  return { headers: { Authorization: `Bearer ${tokenRaw}` } }
}

async function createColumn(blogObj) {
  const res = await axios.post(baseUrl, blogObj, getTokenConfig())
  return res.data
}

async function renameColumn(id, blogObj) {
  const res = await axios.patch(`${baseUrl}/${id}`, blogObj, getTokenConfig())
  return res.data
}

async function deleteColumn(id) {
  await axios.delete(`${baseUrl}/${id}`, getTokenConfig())
}

export default { createColumn, renameColumn, deleteColumn }
