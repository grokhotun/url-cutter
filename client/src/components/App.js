import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {useRoutes} from '@/routes'
import {useAuth} from '@/hooks/auth.hook'
import {AuthContext} from '@/context/AuthContext'
import Navbar from '@/components/Navbar'
import Loader from '@/components/Loader'

const App = () => {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuthed = !!token
  const routes = useRoutes(isAuthed)

  if (!ready) {
    return (
      <Loader/>
    )
  }
  return (
    <AuthContext.Provider value={{token, login, logout, userId, isAuthed}}>
      <BrowserRouter>
        <div className="wrapper">
          <div className="container">
            {isAuthed && <Navbar/>}
            {routes}
          </div>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
