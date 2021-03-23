import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'

import LinksPage from '@/pages/LinksPage'
import CreatePage from '@/pages/CreatePage'
import DetailPage from '@/pages/DetailPage'
import AuthPage from './pages/AuthPage'

export const useRoutes = (isAuthed) => {
  if (isAuthed) {
    return (
      <Switch>
        <Route exact path='/links'>
          <LinksPage/>
        </Route>
        <Route exact path='/create'>
          <CreatePage/>
        </Route>
        <Route path='/detail/:id'>
          <DetailPage/>
        </Route>
        <Redirect to='/create'/>
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route exact path='/'>
          <AuthPage/>
        </Route>
        <Redirect to='/'/>
      </Switch>
    )
  }
}
