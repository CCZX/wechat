import React, { useState, useRef, useEffect } from 'react'
import { Table, Button, Modal, message, Popconfirm, Popover } from 'antd'
import AddForm from './addForm'
import { adminApi } from './../../api'

import './index.scss'

const columns = [
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
  },
  {
    title: '账号',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname',
  },
  {
    title: '权限',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: '编辑',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: (text, record) => {
      const content = (
        <div>
          <div>
            <Popconfirm
              title="逻辑删除后可恢复该用户。"
              okText="Yes"
              cancelText="No"
            >
              <Button type="link">逻辑删除</Button>
            </Popconfirm>
          </div>
          <div>
            <Popconfirm
              title="物理删除后不可恢复。"
              okText="Yes"
              cancelText="No"
            >
              <Button type="link">逻辑删除</Button>
            </Popconfirm>
          </div>
        </div>
      )
      return (
        <Popover
          content={content}
          title="操作"
          trigger="click"
        >
          <Button type="primary">编辑用户</Button>
        </Popover>
      )
    }
  }
];

export default function AdminManage(props) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [newSuperUser, setNewSuperUser] = useState({
    name: '',
    password: '',
    role: '1'
  })
  const [adminUserList, setAdminUserList] = useState([])

  useEffect(() => {
    ;(async () => {
      const { data = {} } = await adminApi.getAllSuperUser()
      console.log(data)
      if (data.status === 2000) {
        setAdminUserList(data.data)
      }
    })()
  }, [])

  const handleOk = async () => {
    for (const key in newSuperUser) {
      if (newSuperUser.hasOwnProperty(key)) {
        if (!newSuperUser[key]) {
          message.error('信息不完整')
          return
        }
      }
    }
    const { data } = await adminApi.add(newSuperUser)
    if (data.status === 2000) {
      message.success('添加成功！')
      setShowAddModal(false)
    }
  }

  const handleCancel = () => {
    setShowAddModal(false)
  }

  const onChange = (arg) => {
    const { type, data } = arg
    const tmp = {...newSuperUser, [type]: data}
    setNewSuperUser(tmp)
  }

  return (
    <div className="admin-manage-page">
      <Modal
        title="创建管理员"
        visible={showAddModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <AddForm onChange={onChange} />
      </Modal>
      <header className="admin-manage-header">
        <p>当前管理员</p>
        <Button type="primary" onClick={() => {setShowAddModal(true)}}>添加新的管理员</Button>
      </header>
      <Table dataSource={adminUserList} columns={columns} />
    </div>
  )
}
