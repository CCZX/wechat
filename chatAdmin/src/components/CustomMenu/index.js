import React, { Component } from 'react'
import { Icon, Menu } from 'antd'
import { Link } from 'react-router-dom'
const { SubMenu } = Menu

class CustomMenu extends Component {
  renderMenuItem = ({key, icon, title}) => {
    return (
      <Menu.Item key={key}>
        <Link to={key}>
          { icon && <Icon type={icon} /> }
          <span>{title}</span>
        </Link>
      </Menu.Item>
    )
  }
  renderSubMenu = ({key, icon, title, subs}) => {
    return (
      <SubMenu key={key} title={<span>{icon && <Icon type={icon} />}<span>{title}</span></span>}>
        {
          subs && subs.map(item => {
            return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
          })
        }
      </SubMenu>
    )
  }
  render() {
    const { menus } = this.props
    return (
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {
          menus && menus.map(item => {
            return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
          })
        }
      </Menu>
    )
  }
}

export default CustomMenu
