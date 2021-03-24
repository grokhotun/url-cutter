import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {AuthContext} from '@/context/AuthContext'

const Navbar = () => {
  const {logout} = useContext(AuthContext)
  const history = useHistory()

  const clickHandler = () => {
    logout()
    history.push('/')
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand">URL Cutter</span>
        <div className="navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/create" className="nav-link active">Создать</Link>
            </li>
            <li className="nav-item">
              <Link to="/links" className="nav-link active">Ссылки</Link>
            </li>
          </ul>
        </div>
        <button onClick={clickHandler} className="btn btn-danger btn-sm">Выйти</button>
      </div>
    </nav>
  )
}

export default Navbar
