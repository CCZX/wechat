import React, { Component } from 'react'
import { Layout } from 'antd'
import CustomMenu from './../CustomMenu'
import { menus } from './../../route/const'
const { Sider } = Layout

class SiderNav extends Component {
  render() {
    const { collapsed } = this.props
    return (
      <Sider collapsible collapsed={collapsed}>
        <CustomMenu menus={menus} collapsed={collapsed} />
      </Sider>
    )
  }
}

export default SiderNav
