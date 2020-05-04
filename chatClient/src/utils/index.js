const scrollList = ["auto", "scroll"]
/**
 * 判断是否是一个滚动元素
 * @param {HTMLElement} el 
 * @param {String} direction 
 */
export function hasScrollElement(el, direction = "vertical") {
  if(!el) return
  let style = window.getComputedStyle(el)
  if (direction === "vertical") {
    return scrollList.includes(style.overflowY)
  } else if (direction === "horizontal") {
    return scrollList.includes(style.overflowX)
  }
}

/**
 * 获取第一个滚动元素
 * @param {HTMLElement} el 
 * @param {String} direction 
 */
export function getFirstScrollElement(el, direction = "vertical") {
  if(!el) return
  if (hasScrollElement(el)) {
    return el
  } else {
    return getFirstScrollElement(el && el.parentElement, direction)
  }
}

/**
 * 格式化时间
 * @param {Date} time 
 * @param {Boolean} full 
 */
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

/**
 * 格式化数字 1 => 01
 * @param {Number} num 
 */
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

/**
 * 格式化日期
 * @param {Date} time 
 * @param {String} type 
 */
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

/**
 * 将时间转化为中文的形式：昨天 12：12，12月12日 12：12
 * @param {String | Number} date 
 */
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

/**
 * 防抖函数
 * @param {Function} fn 
 * @param {Number} wait 
 */
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

/**将我的好友ID、群聊ID保存至localStorage */
export const saveMyFriendsToLocalStorage = (data) => {
  data = JSON.stringify(data)
  window.localStorage.setItem('friends', data)
}
export const saveMyGroupToLocalStorage = (data) => {
  data = JSON.stringify(data)
  window.localStorage.setItem('groups', data)
}

/**
 * 随机名称函数
 */
export function imgRandomName() {
  const timestamp = Date.now().toString(16)
  const random = Math.floor(Math.random()*100)
  const res = `co-messger-${timestamp}-${random}`
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

/**
 * 将最近会话保存到localStorage
 * @param {Object} data 
 */
export const saveRecentConversationToLocal = (data) => {
  if (data.conversationType === 'FRIEND') {
    saveFriend(data._id)
  } else if (data.conversationType === 'GROUP') {
    saveGroup(data.groupId._id)
  }
  
}

/**
 * 数组去重
 * @param {Array} arr 
 */
export const arrUnique = (arr) => {
  const list = [...arr]
  return list.reduce((mult, item) => {
    !mult.includes(item) ? mult.push(item) : null
    return mult
  }, [])
}

/**
 * 
 * @param {HTMLElement} target 
 * @param {String} parentClassName 
 */
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

/**
 * 设置CSS
 * @param {*} theme 
 */
export const setCSS = (theme) => {
  
}

/**
 * 滚动到顶部
 */
export const scrollToTop = () => {
  const top = document.documentElement.scrollTop || document.body.scrollTop;
  if (top > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, top - top / 8)
  }
}

/**
 * 检查指定的元素在视口中是否可见
 * @param {HTMLElement} el 
 * @param {Boolean} partiallyVisible 
 */
export const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}

/**
 * 获取设备类型
 */
export const getDeviceType = () => {
  const reg =  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  return reg.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
}

/**
 * GUID生成
 */
export function genGuid() {
	function _guid() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	return (_guid() + _guid() + "-" + _guid() + "-" + _guid() + "-" + _guid() + "-" + _guid() + _guid() + _guid());
}

export function colorHex (str) {
  // RGB颜色值的正则
  const reg = /^(rgb|RGB)/;
  if (reg.test(str)) {
    let strHex = "#"
    // 把RGB的3个数值变成数组
    let colorArr = str.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",")
    // 转成16进制
    for (let i = 0; i < colorArr.length; i++) {
      let hex = Number(colorArr[i]).toString(16)
      if (hex === "0") {
        hex += hex
      }
      strHex += hex
    }
    return strHex
  } else {
    return
  }
};

/**
 * 16进制转rgb
 * @param {*} str 
 */
export function colorRgb (str) {
  // 16进制颜色值的正则
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 把颜色值变成小写
  let color = str.toLowerCase()
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      let colorNew = "#"
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
      }
      color = colorNew
    }
    // 处理六位的颜色值，转为RGB
    let colorChange = []
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)))
    }
    return {
      r: colorChange[0],
      g: colorChange[1],
      b: colorChange[2],
    }
  } else {
    return
  }
}

 export function computedLevel(onlineTime) {
  const toHour = onlineTime / 1000 / 60 /60
  const res = Math.ceil(toHour)
  return res > 8 ? 8 : res
}
