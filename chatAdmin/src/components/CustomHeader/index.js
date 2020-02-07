import React, { Component } from 'react'
import { Layout, Avatar, Icon } from 'antd'
const { Header } = Layout

class CustomHeader extends Component {
  render() {
    const { collapsed, toggle } = this.props
    return (
      <Header className="custom-header" style={{ background: '#fff' }}>
        <Icon
          style={{'marginLeft': '-30px', 'marginRight': '30px'}}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={() => toggle()}
        />
        <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <span>管理员界面</span>
      </Header>
    )
  }
}

export default CustomHeader
