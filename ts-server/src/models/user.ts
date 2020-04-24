import { Schema, Document, Model, model } from 'mongoose'
import DB from './../utils/connectDB'

export interface Iuser extends Document {
  name: String, // 账号
  pass: String, // 密码
  code: String, // 在系统的唯一code
  photo: String, // 头像
  signature: String, // 签名
  nickname: String, // 昵称
  province: Object, // 省
  city: Object, // 市
  town: Object, // 区
  sex: String, // 性别
  signUpTime: Date, // 注册时间
  lastLoginTime: Date, // 最后登录时间
  onlineTime: Number, // 在线时长总计
  conversationsList: Array<any>, // 会话列表
  cover: Array<any>, // 背景图
  status: String, // 状态
  age: String, // 年龄
  loginSetting: Object, // 登录日志
  friendFenzu: Object, // 分组
  friendBeizhu: Object // 备注
}

const userSchema: Schema = new DB.Schema({
  name: {type: String, unique: true},
  pass: String,
  code: {type: String, unique: true},
  photo: {type: String, default: '/img/picture.png'}, // 默认头像
  signature: { type: String, default: '' },
  nickname: { type: String, default: ''},
  email: { type: String, default: '' },
  province: { type: Object, default: {name: "四川省", value: "510000"} }, // 省
  city: { type: Object, default: {name: "成都市", value: "510100"} }, // 市
  town: { type: Object, default: {name: "龙泉驿区", value: "510112"} }, // 县
  sex: { type: String, default: '3' }, // 0 男 1 女 3 保密
  signUpTime: { type: Date, default: Date.now() }, // 注册时间
  lastLoginTime: { type: Date, default: Date.now() }, // 最后一次登录
  conversationsList: Array, // 会话列表 * name 会话名称 * photo 会话头像 * id 会话id * type 会话类型 group/ frend
  cover: { type: Array, default: ['/img/cover.jpg', '/img/cover1.jpg'] }, // 封面展示
  status: { type: Number, default: 0 }, // 0：正常可用，1：冻结不可用，2：注销不可用
  age: { type: String, default: '18' },
  loginSetting: { // 存储用户登录的IP、浏览器、OS等信息
    type: Object,
    default: {}
  },
  friendFenzu: {
    type: Object,
    default: {'我的好友': []}
  },
  friendBeizhu: {
    type: Object,
    default: {}
  },
  onlineTime: {
    type: Number,
    default: 0
  }
})

const User: Model<Iuser> = model<Iuser>('user', userSchema)

export default User
