import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ContentMain from './../layout/ContentMain'

import Login from './../pages/Login'
import Home from './../pages/Home'
/**用户管理相关 */
import { StatisticsUser, EditUser } from './../pages/User'
import { StatisticsGroup } from './../pages/Group'
/**管理员管理 */
import AdminManage from './../pages/Admin'
/**系统静态资源 */
import AvatarStatics from './../pages/Statics/avatar'

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

              <Route exact path="/home/group" render={()=> <Redirect replace to='/home/group/statistics' />}></Route>
              <Route exact path="/home/group/statistics" component={StatisticsGroup}></Route>

              <Route exact path="/home/admin/manage" component={AdminManage}></Route>

              <Route exact path="/home/statics/avatars" component={AvatarStatics}></Route>
            </Switch>
          </ContentMain>
        </Switch>
      </Router>
    )
  }
}

export default RouterDom
