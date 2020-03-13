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

export const saveRecentConversationToLocal = (data) => {
  let res = window.localStorage.getItem('coMessager-recentConversation') || ''
  res = res ? res + ',' + data : data
  window.localStorage.setItem('coMessager-recentConversation', res)
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
  while (cur !== null) {
    if (cur.classList.contains(parentClassName)) {
      return cur
    }
    cur = cur.parentNode
  }
}
