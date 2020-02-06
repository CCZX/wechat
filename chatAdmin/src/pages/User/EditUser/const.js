import React from 'react'
import { Button, Icon, Switch, Popover, Tag, Tooltip, Popconfirm  } from 'antd'
import { formatDate, formatSex } from './../../../utils'

export const returnColumns = that => (
  [
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
        <span><Icon type="clock-circle" /> { formatDate(new Date(text), false) }</span>
      )
    },
    {
      title: '最后登录时间',
      dataIndex: 'lastLoginTime',
      key: 'lastLoginTime',
      width: 300,
      render:(text) => (
        <span><Icon type="clock-circle" /> { formatDate(new Date(text), false) }</span>
      )
    },
    {
      title: '签名',
      dataIndex: 'signature',
      key: 'signature',
      width: 180,
      render: (text) => {
        const res = text ? text.slice(0, 7) + '...' : '暂无数据'
        return(
          <Tooltip placement="top" title={text}>
            <span>{res}</span>
          </Tooltip>
        )
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (text, record, index) => {
        return (
          <span style={{'display': 'flex'}}>
            <Switch onChange={() => {that.handleChangeStatus(record, index)}} checked={text === 0 ? true : false } />{text === 0 ? '正常' : '冻结'}
          </span>
        )
      }
    },
    {
      title: '登录日志',
      dataIndex: 'loginSetting',
      key: 'loginsetting',
      width: 50,
      render: (text, record, index) => {
        const content = (
          <div>
            <p>登录系统：{text.os || '暂无此信息'}</p>
            <p>登录浏览器：{text.browser || '暂无此信息'}</p>
            <p>登录IP：{text.ip || '暂无此信息'}</p>
            <p>登录地区：{text.country || '暂无此信息'}</p>
          </div>
        )
        return (
          <Popover content={content} title="登录日志">
            <Tag color="magenta">查看登录信息</Tag>
          </Popover>
        )
      }
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
                <a href="#">逻辑删除</a>
              </Popconfirm>
            </div>
            <div>
              <Popconfirm
                title="物理删除后不可恢复。"
                okText="Yes"
                cancelText="No"
              >
                <a href="#">逻辑删除</a>
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
    },
  ]
)