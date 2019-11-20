import React, { Component } from 'react'
import { Layout } from 'antd'
import CustomMenu from './../CustomMenu'
import { menus } from './../../route/const'
const { Sider } = Layout

class SiderNav extends Component {
  render() {
    return (
      <Sider>
        <CustomMenu menus={menus} />
      </Sider>
    )
  }
}

export default SiderNav
