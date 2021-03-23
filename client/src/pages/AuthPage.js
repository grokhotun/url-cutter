import React, {useState} from 'react'

const AuthPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const changeHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
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
      <button type="submit" className="btn btn-primary me-3">Войти</button>
      <button type="submit" className="btn btn-primary">Регистрация</button>
    </div>
  )
}

export default AuthPage
