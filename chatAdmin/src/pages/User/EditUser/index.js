import React, { Component } from 'react'
import { Table, message } from 'antd'
import { userApi } from './../../../api'
import CustomModal from './components/Modal'
import { returnColumns } from './const'

const { changeUserStatus } = userApi

class EditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: [],
      visible: false,
      // columns: returnColumns(this)
    }
    this.columns = returnColumns(this)
  }
  handlerClick = (text, recode, index) => {
    console.log(text, recode, index)
  }
  toggleModalVisiable = (record) => {
    const { visible } = this.state
    const { getUserInfo } = userApi
    this.setState({
      visible: !visible
    })
    if (record && record._id) {
      getUserInfo(record._id).then(res => {
        console.log(res)
      })
    }
  }
  handleChangeStatus = (record, index) => {
    const { userList } = this.state
    const originStatus = userList[index].status
    const nowStatus = originStatus === 0 ? 1 : 0
    originStatus === 0 ? userList[index].status = 1 : userList[index].status = 0
    const params = {
      id: record._id,
      state: nowStatus
    }
    changeUserStatus(params).then(res => {
      const { status } = res.data
      if (res.status < 400 && status === 2000) {
        message.success('修改成功！')
      }
    })
    this.setState({
      userList: userList
    })
  }
  render() {
    const { visible, userList } = this.state
    return (
      <div className="user-edit-page">
        <Table rowKey={i => i._id} columns={this.columns} dataSource={userList} scroll={{ x: 1500, y: 0 }} />
        <CustomModal visible={visible} toggle={this.toggleModalVisiable} />
      </div>
    )
  }
  componentDidMount() {
    const { getAllUser } = userApi
    getAllUser().then(res => {
      const { data, status } = res.data
      if (res.status < 400 && status === 2000) {
        data.forEach(item => {
          item.address = item.province.name + item.city.name
          item.loginSetting = item.loginSetting ? item.loginSetting : {}
        })
        this.setState({
          userList: data
        })
      }
    })
  }
}

export default EditUser
