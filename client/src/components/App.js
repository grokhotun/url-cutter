import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {useRoutes} from '@/routes'
import {useAuth} from '@/hooks/auth.hook'
import {AuthContext} from '@/context/AuthContext'

const App = () => {
  const {token, login, logout, userId} = useAuth()
  const isAuthed = !!token
  const routes = useRoutes(isAuthed)
  return (
    <AuthContext.Provider value={{token, login, logout, userId, isAuthed}}>
      <BrowserRouter>
        <div className="wrapper">
          <div className="container">
            {routes}
          </div>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
