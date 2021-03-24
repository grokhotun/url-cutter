import {useState, useCallback, useEffect} from 'react'

const STORAGE_NAME = 'URLCutter'

export const useAuth = () => {
  const [ready, setReady] = useState(false)
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken)
    setUserId(id)
    localStorage.setItem(STORAGE_NAME, JSON.stringify({userId: id, token: jwtToken}))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(STORAGE_NAME)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_NAME))
    if (data && data.token) {
      login(data.token, data.userId)
    }
    setReady(true)
  }, [login])

  return {
    ready,
    login,
    logout,
    token,
    userId
  }
}
