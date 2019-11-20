import React from 'react'
import { Button } from 'antd'

export const columns = [
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
    width: 150,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 150,
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    width: 150,
  },
  {
    title: '所在地',
    dataIndex: 'address',
    key: 'address',
    width: 150,
  },
  {
    title: '注册时间',
    dataIndex: 'signUpTime',
    key: 'signUpTime',
    width: 150,
  },
  {
    title: '最后登录时间',
    dataIndex: 'lastLoginTime',
    key: 'lastLoginTime',
    width: 150,
  },
  {
    title: '签名',
    dataIndex: 'signature',
    key: 'signature',
    width: 150,
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: (text, record) => (
      <Button type="primary" onClick={() => {console.log(this)}}>
        修改
      </Button>
    )
  },
];