import {createContext} from 'react'

export const AuthContext = createContext({
  token: null,
  userUd: null,
  login: () => {},
  logout: () => {},
  isAuthed: false
})
