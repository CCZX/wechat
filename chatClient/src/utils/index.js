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
export function formatTime(time) {
  
}

export function isProduction() {
  return process.env.NODE_ENV === 'production'
}

// 登录注册时的验证
export const accountReg = /^[\w\d_]{3,6}/
export const passwordReg = /^[\w\d]{6,14}/

// 格式化日期

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
