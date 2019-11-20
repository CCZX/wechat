import React, { Component } from 'react'
import { Modal } from 'antd'
// import { userApi } from './../../../../api'

class CustomModal extends Component {
  render() {
    const { visible } = this.props
    const { toggle } = this.props
    return (
      <Modal
          title="Basic Modal"
          visible={visible}
          // visible={this.state.visible}
          // onOk={this.handleOk}
          onCancel={() => {toggle()}}
          // okButtonProps={{ disabled: true }}
          // cancelButtonProps={{ disabled: true }}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
    )
  }
  // componentDidMount() {
  //   const { visible } = this.props
  //   const { getUserInfo } = userApi
  //   if (visible) {
  //     getUserInfo()
  //   }
  // }
}

export default CustomModal
