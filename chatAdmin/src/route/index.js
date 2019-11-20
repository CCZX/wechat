import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ContentMain from './../components/ContentMain'

import Login from './../pages/Login'
import Home from './../pages/Home'
import { StatisticsUser, EditUser } from './../pages/User'

class RouterDom extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <ContentMain>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/home" component={Home}></Route>
              <Route exact path="/home/user" render={()=> <Redirect replace to='/home/user/statistics' />}></Route>
              <Route exact path="/home/user/statistics" component={StatisticsUser}></Route>
              <Route exact path="/home/user/edit" component={EditUser}></Route>
            </Switch>
          </ContentMain>
        </Switch>
      </Router>
    )
  }
}

export default RouterDom
