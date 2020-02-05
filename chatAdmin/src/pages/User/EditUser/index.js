import React, { Component } from 'react'
import { Table, Button, Icon, Switch  } from 'antd'
import { userApi } from './../../../api'
import { formatTime, formatSex } from './../../../utils'
import CustomModal from './components/Modal'

const { changeUserStatus } = userApi

class EditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: [],
      visible: false,
      columns:  [
        {
          title: 'chatID',
          width: 100,
          dataIndex: 'code',
          key: 'code',
          fixed: 'left',
        },
        {
          title: '账号',
          width: 100,
          dataIndex: 'name',
          key: 'name',
          fixed: 'left',
        },
        {
          title: '昵称',
          dataIndex: 'nickname',
          key: 'nickname',
          width: 80,
          ellipsis: true,
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
          width: 100,
          ellipsis: true,
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key: 'sex',
          width: 100,
          render:(text) => (
            <span>{ formatSex(text) }</span>
          )
        },
        {
          title: '所在地',
          dataIndex: 'address',
          key: 'address',
          width: 200,
          ellipsis: true,
        },
        {
          title: '注册时间',
          dataIndex: 'signUpTime',
          key: 'signUpTime',
          width: 300,
          render:(text) => (
            <span><Icon type="clock-circle" /> { formatTime(new Date(text), false) }</span>
          )
        },
        {
          title: '最后登录时间',
          dataIndex: 'lastLoginTime',
          key: 'lastLoginTime',
          width: 300,
          render:(text) => (
            <span><Icon type="clock-circle" /> { formatTime(new Date(text), false) }</span>
          )
        },
        {
          title: '签名',
          dataIndex: 'signature',
          key: 'signature',
          width: 150,
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          width: 50,
          render: (text, record, index) => {
            return (
              <span>
                <Switch onChange={() => {this.handleChangeStatus(record, index)}} checked={text === 0 ? true : false } />{text === 0 ? '正常' : '冻结'}
              </span>
            )
          }
        },
        {
          title: 'Action',
          key: 'operation',
          fixed: 'right',
          width: 100,
          render: (text, record) => (
            <Button type="primary" onClick={() => this.toggleModalVisiable(record)}>
              修改
            </Button>
          )
        },
      ]
    }
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
      console.log(res)
    })
    this.setState({
      userList: userList
    })
  }
  render() {
    const { visible } = this.state
    const { columns, userList } = this.state
    return (
      <div className="user-edit-page">
        <Table rowKey={i => i._id} columns={columns} dataSource={userList} />
        <CustomModal visible={visible} toggle={this.toggleModalVisiable} />
      </div>
    )
  }
  componentDidMount() {
    const { getAllUser } = userApi
    getAllUser().then(res => {
      const { data, status } = res.data
      console.log(data)
      if (res.status === 200 && status === 2000) {
        data.forEach(item => {
          item.address = item.province.name + item.city.name
        })
        this.setState({
          userList: data
        })
      }
    })
  }
}

export default EditUser
