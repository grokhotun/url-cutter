import React, {useContext, useEffect, useState} from 'react'
import {useFetch} from '@/hooks/http.hook'
import {AuthContext} from '@/context/AuthContext'

const AuthPage = () => {
  const {login} = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState('')
  const {isLoading, isError, request} = useFetch()
  const [form, setForm] = useState({email: '', password: ''})

  useEffect(() => {
    if (isError) {
      setErrorMessage(isError.message)
    }
  }, [isError])

  const changeHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      console.log('Data:', data)
    } catch (error) {
      console.log(error)
    }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      login(data.token, data.userId)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="auth-page">
      <h1 className="text-center">Регистрация</h1>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          onChange={changeHandler}
          name="email"
          type="text"
          className="form-control"
          id="email"/>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Пароль</label>
        <input
          onChange={changeHandler}
          name="password"
          type="password"
          className="form-control"
          id="password"/>
      </div>
      <div className="mb-3 text-danger">
        {errorMessage}
      </div>
      <button disabled={isLoading} onClick={loginHandler} className="btn btn-primary me-3">Войти</button>
      <button disabled={isLoading} onClick={registerHandler} className="btn btn-primary">Регистрация</button>
    </div>
  )
}

export default AuthPage
