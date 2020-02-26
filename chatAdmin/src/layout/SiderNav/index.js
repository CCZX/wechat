import React from 'react'
import { Layout } from 'antd'
import CustomMenu from './../CustomMenu'
import { menus } from './../../route/const'
import './index.scss'
const { Sider } = Layout

function SiderNav({collapsed}) {
  return (
    <Sider className="custom-sider" collapsible collapsed={collapsed}>
      <div className="logo">
        <span className="ellipsis">Co-Message-Admin</span>
      </div>
      <CustomMenu menus={menus} collapsed={collapsed} />
    </Sider>
  )
}

export default SiderNav
