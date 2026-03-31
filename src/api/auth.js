import axios from 'axios'

// Returns the JWT string on success, throws on failure.
// Backend response shape: { "token": "<jwt>" }
export async function login(username, password) {
  const response = await axios.post('http://localhost:8080/api/auth/login', {
    username,
    password,
  })
  return response.data.token
}
