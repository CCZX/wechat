import React, { Component } from 'react'
import { Layout, Spin } from 'antd'
import { connect } from 'react-redux'
import SiderNav from './../SiderNav'
import CustomHeader from './../CustomHeader'
import CustomBreadcrumb from './../CustomBreadcrumb'
import './index.scss'
const { Content } = Layout

class ContentMain extends Component {
  render() {
    const { loading } = this.props
    return (
      <div className="container">
        <Layout className="layout-main">
          <SiderNav />
          <Layout style={{ padding: '0 24px 24px' }}>
            <CustomHeader />
            <CustomBreadcrumb />
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Spin spinning={loading}>
                { this.props.children }
              </Spin>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

const mapState = (state) => ({
  loading: state.getIn(['app', 'loading'])
})

const mapDispatch = (dispatch) => ({

})

export default connect(mapState, mapDispatch)(ContentMain)
