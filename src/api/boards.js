import axios from 'axios'

const baseUrl = '/api/boards'

function getTokenConfig() {
  const tokenRaw = localStorage.getItem('token')
  return { headers: { Authorization: `Bearer ${tokenRaw}` } }
}

async function getBoards() {
  const res = await axios.get(baseUrl, getTokenConfig())
  return res.data
}

async function getFullBoard(id) {
  const res = await axios.get(`${baseUrl}/${id}`, getTokenConfig())
  return res.data
}

async function createBoard(blogObj) {
  const res = await axios.post(baseUrl, blogObj, getTokenConfig())
  return res.data
}

async function renameBoard(id, blogObj) {
  const res = await axios.patch(`${baseUrl}/${id}`, blogObj, getTokenConfig())
  return res.data
}

async function deleteBoard(id) {
  await axios.delete(`${baseUrl}/${id}`, getTokenConfig())
}

export default { getBoards, getFullBoard, createBoard, renameBoard, deleteBoard }
