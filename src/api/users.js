import axios from 'axios'

const baseUrl = '/api/users'

function getTokenConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } }
}

async function createUser(blogObj) {
  const user = await axios.post(`${baseUrl}/public`, blogObj)
  return user.data
}

async function editUser(id, blogObj, token) {
  const user = await axios.patch(`${baseUrl}/${id}`, blogObj, getTokenConfig(token))
  return user.data
}

async function deleteUser(id, token) {
  await axios.delete(`${baseUrl}/${id}`, getTokenConfig(token))
}

export default { createUser, editUser, deleteUser }
