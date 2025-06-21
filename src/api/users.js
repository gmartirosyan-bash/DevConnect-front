import axios from 'axios'

const baseUrl = '/api/users'

function getTokenConfig() {
  const tokenRaw = localStorage.getItem('token')
  return { headers: { Authorization: `Bearer ${tokenRaw}` } }
}

async function createUser(blogObj) {
  const user = await axios.post(`${baseUrl}/public`, blogObj)
  return user.data
}

async function editUser(id, blogObj) {
  const user = await axios.patch(`${baseUrl}/${id}`, blogObj, getTokenConfig())
  return user.data
}

async function deleteUser(id) {
  await axios.delete(`${baseUrl}/${id}`, getTokenConfig())
}

export default { createUser, editUser, deleteUser }
