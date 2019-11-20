export function formatTime(time, full = true) { //
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

// 生成近三十天时间数组
export function lastMonth(arr) {
  let res = []
  for(var i = 0;i<30;i++){
    res.unshift(
      {
        time: formatTime(new Date(new Date()
        .setDate(new Date().getDate()-i)), false),
        count: 0
      }
    )
  }
  return res
}

// 格式化性别
export function formatSex(val) {
  return val === '0' ? '男👨' : val === '1' ? '女👩' : '未知'
}
