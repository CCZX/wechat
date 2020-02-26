import React, { Component } from 'react'
import { Layout, Avatar, Icon } from 'antd'
import { entryFullScreen, exitFullScreen } from './../../utils'
import './index.scss'
const { Header } = Layout



class CustomHeader extends Component {
  state = {
    isFullscreen: document.fullscreen
  }
  toggleFullscreen = () => {
    const { isFullscreen } = this.state
    if (isFullscreen) {
      exitFullScreen()
      this.setState({
        isFullscreen: false
      })
    } else {
      entryFullScreen()
      this.setState({
        isFullscreen: true
      })
    }
  }
  renderFullOption = () => {
    const { isFullscreen } = this.state
    return <Icon
      className="header-icon"
      onClick={this.toggleFullscreen}
      type={isFullscreen ? "fullscreen-exit" : "fullscreen"}
    />
  }
  render() {
    const { collapsed, toggle } = this.props
    return (
      <Header className="custom-header" style={{ background: '#fff' }}>
        <Icon
          style={{'marginLeft': '-30px', 'marginRight': '30px'}}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          className="header-icon"
          onClick={() => toggle()}
        />
        <span>管理员界面</span>
        {this.renderFullOption()}
        <Avatar className="avatar" size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      </Header>
    )
  }
}

export default CustomHeader
