import axios from 'axios'

const baseUrl = '/api/boards'

function getTokenConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } }
}

async function getBoards(token) {
  const res = await axios.get(baseUrl, getTokenConfig(token))
  return res.data
}

async function getFullBoard(id, token) {
  const res = await axios.get(`${baseUrl}/${id}`, getTokenConfig(token))
  return res.data
}

async function createBoard(blogObj, token) {
  const res = await axios.post(baseUrl, blogObj, getTokenConfig(token))
  return res.data
}

async function renameBoard(id, blogObj, token) {
  const res = await axios.patch(`${baseUrl}/${id}`, blogObj, getTokenConfig(token))
  return res.data
}

async function deleteBoard(id, token) {
  await axios.delete(`${baseUrl}/${id}`, getTokenConfig(token))
}

export default { getBoards, getFullBoard, createBoard, renameBoard, deleteBoard }
