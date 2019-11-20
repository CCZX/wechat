import React, { Component } from 'react'
import { Layout, Avatar } from 'antd'
const { Header } = Layout

class CustomHeader extends Component {
  render() {
    return (
      <Header className="custom-header" style={{ background: '#fff' }}>
        <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <span>管理员界面</span>
      </Header>
    )
  }
}

export default CustomHeader
