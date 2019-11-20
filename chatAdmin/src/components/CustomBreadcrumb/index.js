import React, { Component } from 'react'
import { Breadcrumb } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import { BreadcrumbList } from './const'

// @withRouter
class CustomBreadcrumb extends Component {
  render() {
    const { pathname } = this.props.location // '/home/user/statistics'
    const pathnameArr = pathname.split('/').filter(i => i)
    const res = pathnameArr.map((item, index, arr) => {
      return '/'+arr.slice(0, index + 1).join('/')
    })
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        {
          res.map(item => {
            return (
              <Breadcrumb.Item key={item}>
                <Link to={item}>{BreadcrumbList[item]}</Link>
              </Breadcrumb.Item>
            )
          })
        }
      </Breadcrumb>
    )
  }
}
export default withRouter(CustomBreadcrumb)
