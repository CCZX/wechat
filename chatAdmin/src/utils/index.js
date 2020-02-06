export function formatDate(time, type = 'YYYY-MM-DD') { //
  const y = formatNumber(time.getFullYear())
  const m = formatNumber(time.getMonth() + 1)
  const d = formatNumber(time.getDate())
  const h = formatNumber(time.getHours())
  const mm = formatNumber(time.getMinutes())
  const s = formatNumber(time.getSeconds())
  if (type === 'YYYY-MM-DD do') {
    return `${y}-${m}-${d} ${h}:${mm}:${s}`
  } else if (type === 'YYYY-MM-DD') {
    return `${y}-${m}-${d}`
  } else if (type === 'YYYY-MM') {
    return `${y}-${m}`
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

// 生成三十天时间数组
export function lastMonth(date) {
  let res = []
  for(var i = 0;i<30;i++){
    res.unshift(
      {
        time: formatDate(new Date(new Date(date)
        .setDate(new Date(date).getDate() + i)), 'YYYY-MM-DD'),
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
