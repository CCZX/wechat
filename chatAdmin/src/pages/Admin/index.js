import React, { useState, useRef } from 'react'
import { Table, Button, Modal, message } from 'antd'
import AddForm from './addForm'
import { adminApi } from './../../api'

import './index.scss'

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

export default function AdminManage(props) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [newSuperUser, setNewSuperUser] = useState({
    name: '',
    password: '',
    role: '1'
  })

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
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}
