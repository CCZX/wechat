import React, { Component } from 'react'
import { Input, Button, Icon, message } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { adminApi } from './../../api'
import { saveToken } from './../../utils'
import { actionCreators } from './../../store/modules/app'

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
      const data = res.data || {}
      if (data.status === 1000) {
        message.success('登录成功！')
        this.props.setCurrAdmin(data.data.userInfo)
        saveToken(data.data.token)
        this.props.history.push('/home')
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
        {/* <div className="form-item cvcode">
          <Input prefix={<Icon type="lock" />} />
          <div>验证码</div>
        </div> */}
        <div className="form-item">
          <Button onClick={this.login} type="primary" block>登录</Button>
        </div>
      </div>
    )
  }
}

function mapDispatch(dispatch) {
  return {
    setCurrAdmin(adminInfo) {
      const action = actionCreators.setCurrAdmin(adminInfo)
      dispatch(action)
    }
  }
}

export default connect(null, mapDispatch)(withRouter(LoginForm))
