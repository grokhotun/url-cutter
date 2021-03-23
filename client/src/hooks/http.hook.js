import {useCallback, useState} from 'react'

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setIsLoading(true)
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }
      const response = await fetch(url, {method, body, headers})
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так')
      }
      setIsLoading(false)
      return data
    } catch (error) {
      setIsLoading(false)
      setIsError(error)
      throw error
    }
  }, [])

  const clearError = () => setIsError(null)

  return {
    isLoading,
    isError,
    request,
    clearError
  }
}
