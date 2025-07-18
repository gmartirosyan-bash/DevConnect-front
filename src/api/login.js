import axios from 'axios'

const baseUrl = '/api/login'

async function login(credentials) {
  const user = await axios.post(baseUrl, credentials)
  return user.data
}

export default { login }
