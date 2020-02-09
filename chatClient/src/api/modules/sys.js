import request from '@/utils/request'

export default {
  getSysUsers() {
    return request.get('/sys/sysusers')
  },
  getQiniuToken() {
    return request.get('/sys/qiniutoken')
  },
  // 获取天气信息
  getWeather(city) {
    return request.get(`http://wthrcdn.etouch.cn/weather_mini?city=${city}`)
  }
}
