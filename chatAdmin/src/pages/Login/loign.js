import React, { Component } from 'react'
import { Input, Button, Icon, message } from 'antd'
import { adminApi } from './../../api'
import { saveToken } from './../../utils'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: ''
    }
  }

  handlerNameChange = (e) => {
    this.setState({name: e.target.value})
  }

  handlerPwdChange = (e) => {
    this.setState({password: e.target.value})
  }

  login = () => {
    const {name, password} = this.state
    const params = {
      name, password
    }
    adminApi.login(params).then(res => {
      console.log(res)
      const data = res.data
      if (data.status === 1000) {
        message.success('登录成功！')
        saveToken(data.data.token)
        window.location.href = `${window.location.origin}/home`
      }
    })
  }

  render() {
    return (
      <div className="login-form">
        <div className="form-item">
          <Input autoComplete="new-password" onChange={this.handlerNameChange} prefix={<Icon type="user" />}></Input>
        </div>
        <div className="form-item">
          <Input.Password autoComplete="new-password" onChange={this.handlerPwdChange} prefix={<Icon type="lock" />} />
        </div>
        <div className="form-item cvcode">
          <Input prefix={<Icon type="lock" />} />
          <div>验证码</div>
        </div>
        <div className="form-item">
          <Button onClick={this.login} type="primary" block>登录</Button>
        </div>
      </div>
    )
  }
}

export default LoginForm
