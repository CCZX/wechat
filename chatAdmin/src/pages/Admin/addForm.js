import React from 'react'
import { Form, Icon, Input, Select } from 'antd';

const { Option } = Select

class AddForm extends React.Component {
  render() {
    const { onChange } = this.props
    return (
      <Form>
        <Form.Item>
          <Input
            autoComplete="on"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="账号"
            onChange={(e) => {onChange({type: 'name', data: e.target.value})}}
          />
        </Form.Item>
        <Form.Item>
          <Input
            autoComplete="on"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="密码"
            onChange={(e) => {onChange({type: 'password', data: e.target.value})}}
          />
        </Form.Item>
        <Form.Item>
        <Select
          defaultValue="1"
          placeholder="选择身份"
          onChange={(e) => {onChange({type: 'role', data: e})}}
        >
          <Option value="0">超级管理员（增删改查权限）</Option>
          <Option value="1">普通管理员（查权限）</Option>
        </Select>
        </Form.Item>
      </Form>
    );
  }
}

export default AddForm
