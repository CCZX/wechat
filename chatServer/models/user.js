// 用户数据模型
const DB = require('./../utils/connectDB')
const Schema = DB.Schema
const userSchema = new Schema({
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
  bubble: { type: String, default: 'vchat' }, // 气泡
  chatColor: { type: String, default: '#ffffff' }, // 聊天文字颜色
  bgOpa: { type: Number, default: 0.2 }, // 聊天框透明度
  projectTheme: { type: String, default: 'vchat' }, // 项目主题
  wallpaper: { type: String, default: '/img/wallpaper.jpg' }, // 聊天壁纸
  signUpTime: { type: Date, default: Date.now() }, // 注册时间
  lastLoginTime: { type: Date, default: Date.now() }, // 最后一次登录
  conversationsList: Array, // 会话列表 * name 会话名称 * photo 会话头像 * id 会话id * type 会话类型 group/ frend
  cover: { type: Array, default: ['/img/cover.jpg', '/img/cover1.jpg'] }, // 封面展示
  emoji: Array, // 表情包
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
  /**
   * {
   *    id: 'C罗',
   *    id: '梅西'
   * }
   */
  friendBeizhu: {
    type: Object,
    default: {}
  }
})
const user = DB.model('user', userSchema)

module.exports = user
