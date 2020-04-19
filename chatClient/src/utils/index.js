// 判断是否是一个滚动元素
const scrollList = ["auto", "scroll"]
export function hasScrollElement(el, direction = "vertical") {
  if(!el) return
  let style = window.getComputedStyle(el)
  if (direction === "vertical") {
    return scrollList.includes(style.overflowY)
  } else if (direction === "horizontal") {
    return scrollList.includes(style.overflowX)
  }
}

// 获取第一个滚动元素
export function getFirstScrollElement(el, direction = "vertical") {
  if(!el) return
  if (hasScrollElement(el)) {
    return el
  } else {
    return getFirstScrollElement(el && el.parentElement, direction)
  }
}

// 格式化时间
export function fromatTime(time, full = true) { //
  const y = formatNumber(time.getFullYear())
  const m = formatNumber(time.getMonth() + 1)
  const d = formatNumber(time.getDate())
  const h = formatNumber(time.getHours())
  const mm = formatNumber(time.getMinutes())
  const s = formatNumber(time.getSeconds())
  if (full) {
    return `${y}-${m}-${d} ${h}:${mm}:${s}`
  } else {
    return `${y}-${m}-${d}`
  }
}

// 格式化数字 '1' => '01'
function formatNumber(num) {
  let isNumber = isType('Number')
  if (!isNumber(num)) return
  return num >= 10 ? String(num) : '0' + String(num)
}

// 判断数据类型
function isType(type) {
  return (arg) => {
    return Object.prototype.toString.call(arg) === `[object ${type}]`
  }
}

export function isProduction() {
  return process.env.NODE_ENV === 'production'
}

// 登录注册时的验证
export const accountReg = /^[\w\d_]{3,6}/
export const passwordReg = /^[\w\d]{6,14}/

// 格式化日期
export function formatDate(time, type = 'YYYY-MM-DD') { //
  const y = formatNumber(time.getFullYear())
  const m = formatNumber(time.getMonth() + 1)
  const d = formatNumber(time.getDate())
  const h = formatNumber(time.getHours())
  const mm = formatNumber(time.getMinutes())
  const s = formatNumber(time.getSeconds())
  if (type === 'YYYY-MM-DD HH-MM-SS') {
    return `${y}-${m}-${d} ${h}:${mm}:${s}`
  } else if (type === 'YYYY-MM-DD') {
    return `${y}-${m}-${d}`
  } else if (type === 'YYYY-MM') {
    return `${y}-${m}`
  } else if (type === 'HH-MM-SS') {
    return `${h}:${mm}:${s}`
  } else if (type === 'HH') {
    return `${h}`
  }
}

// 将时间转化为中文的形式：昨天 12：12，12月12日 12：12
export const formatDateToZH = (date) => {
  const targetDate = new Date(date)
  const nowTime = new Date(formatDate(new Date())).getTime()
  const targetTime = new Date(formatDate(targetDate)).getTime()
  const daysAgo = (nowTime - targetTime) / 86400000
  const yearsAgo = new Date().getFullYear() - targetDate.getFullYear()
  const year = `${targetDate.getFullYear()}年`
  const monthAndDay = `${formatNumber(targetDate.getMonth() + 1)}月${formatNumber(targetDate.getDate())}日`
  const hourAndMinute = formatNumber(targetDate.getHours())+':'+formatNumber(targetDate.getMinutes())
  if (daysAgo < 1) {
    return hourAndMinute
  } else if (1 <= daysAgo && daysAgo < 2) {
    return `昨天 ${hourAndMinute}`
  } else if (yearsAgo < 1) {
    return monthAndDay + ' ' + hourAndMinute
  } else {
    return year + monthAndDay + ' ' + hourAndMinute
  }
}

/**
 * validate reg
 */
export const validateNickname = (rule, value, callback) => {
  if (value === "") {
    callback();
  } else {
    if (value.length > 12) {
      callback(new Error("请输入不超过12位字符"));
      return;
    }
    callback();
  }
}
export const validatePhone = (rule, value, callback) => {
  if (value === "") {
    callback();
  } else {
    let reg = /^1[3|4|5|7|8]\d{9}$/;
    if (!reg.test(value)) {
      callback(new Error("请输入正确的手机格式！"));
      return;
    }
    callback();
  }
}
export const validateEmail = (rule, value, callback) => {
  if (value === "") {
    callback();
  } else {
    let reg = /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/;
    if (!reg.test(value)) {
      callback(new Error("请输入正确的邮箱格式！"));
      return;
    }
    callback();
  }
}
export const validateSignature = (rule, value, callback) => {
  if (value === "") {
    callback();
  } else {
    if (value.length > 100) {
      callback(new Error("请输入不超过100位字符"));
      return;
    }
    callback();
  }
}

// 防抖函数
export function debounce(fn, wait) {
  let timer
  return function (...arg) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arg)
    },wait);
  }
}

export const saveMyFriendsToLocalStorage = (data) => {
  data = JSON.stringify(data)
  window.localStorage.setItem('friends', data)
}

export const saveMyGroupToLocalStorage = (data) => {
  data = JSON.stringify(data)
  window.localStorage.setItem('groups', data)
}

// 随机名称函数
export function imgRandomName() {
  const timestamp = Date.now().toString(16)
  const random = Math.floor(Math.random()*100)
  const res = `cc-messger-${timestamp}-${random}`
  return res
}

const saveFriend = (id) => {
  const storage = window.localStorage
  let recentStr = (storage.getItem('coMessager-recentConversation-friend') || '')
  const recentArr = recentStr.split(',')
  if (recentArr.includes(id)) return
  recentStr = recentStr ? recentStr + ',' + id : id
  storage.setItem('coMessager-recentConversation-friend', recentStr)
}

const saveGroup = (id) => {
  const storage = window.localStorage
  let recentStr = (storage.getItem('coMessager-recentConversation-group') || '')
  const recentArr = recentStr.split(',')
  if (recentArr.includes(id)) return
  recentStr = recentStr ? recentStr + ',' + id : id
  storage.setItem('coMessager-recentConversation-group', recentStr)
}

export const saveRecentConversationToLocal = (data) => {
  if (data.conversationType === 'FRIEND') {
    saveFriend(data._id)
  } else if (data.conversationType === 'GROUP') {
    saveGroup(data.groupId._id)
  }
  
}

export const arrUnique = (arr) => {
  const list = [...arr]
  return list.reduce((mult, item) => {
    !mult.includes(item) ? mult.push(item) : null
    return mult
  }, [])
}

export const findParentNode = (target, parentClassName) => {
  let cur = target
  while (cur !== null && cur !== document) {
    if (cur.classList.contains(parentClassName)) {
      return cur
    }
    cur = cur.parentNode
  }
}

/**
 * localStorage管理
 * 这里只针对JSON.pase()出来是对象、数组、number、null的情况，如果涉及String不支持，会报错
 */
export class LocalStorageManager {
  /**获取JSON */
  getJson(key) {
    const value = window.localStorage.getItem(key) || "null"
    return JSON.parse(value)
  }
  /**获取字符串 */
  getStr(key) {
    const value = window.localStorage.getItem(key)
    return value
  }
  set(key, value) {
    // const isObj = Object.prototype.toString.call(value) === "[object Object]"
    /**数组、对象都转字符串 */
    const isObj = typeof value === 'object'
    const strVal = isObj ? JSON.stringify(value) : value
    window.localStorage.setItem(key, strVal)
  }
}

/**
 * 将获取到的本地图片转为base64
 * @param {HTMLInputElement} fileDom
 */
export const localImgToBase64 = (fileDom) => {
  /**jpeg和jpg是一种 */
  const imgTypeArr = ['jpeg', 'png', 'gif', 'jpg']
  return new Promise((resolve, reject) => {
    const [file] = fileDom.files
    const fileType = file.type && file.type.split("/")[1]
    const fileSize = file.size / 1024 / 1024
    if (!imgTypeArr.includes(fileType)) {
      reject('只能上传图片！')
    }
    if (fileSize > 0.5) {
      reject('只能上传小于0.5M的图片！')
    }
    console.log(file)
    const imgFileReader = new  FileReader()
    imgFileReader.readAsDataURL(file)
    imgFileReader.onload = (e) => {
      const data = e.target.result
      resolve(data)
    }
    imgFileReader.onerror = () => {
      reject('上传失败！')
    }
  })
}
