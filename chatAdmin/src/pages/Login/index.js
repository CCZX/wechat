import React, { Component } from 'react'
import './index.scss'
import Loginform from './loign'
import Registerform from './register'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: true
    }
  }
  render() {
    const { isLogin } = this.state
    return (
      <div className="login-page">
        <div className="wrapper">
          <div className="header">
            <span className="pointer" onClick={this.toggleState}>登录</span>
            <span className="pointer" onClick={this.toggleState}>注册</span>
          </div>
          {
            isLogin ? <Loginform /> : <Registerform />
          }
        </div>
      </div>
    )
  }
  toggleState = () => {
    const { isLogin } = this.state
    this.setState({
      isLogin: !isLogin
    })
  }
}

export default Login
