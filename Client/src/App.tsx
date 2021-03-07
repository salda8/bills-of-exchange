import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Home from './pages/Home'
import Boe from './pages/Boe'
import User from './pages/User'
import Layout from './components/Layout'
import Page404 from './pages/404'

export default function BasicExample() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/404">
            <Page404 />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/boe/:boeId">
            <Boe />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout>
    </Router>
  )
}
