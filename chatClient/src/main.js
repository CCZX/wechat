// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import VueAMap from 'vue-amap'
import 'element-ui/lib/theme-chalk/index.css'
import VueSocketIO from 'vue-socket.io'
import fullCalendar from 'vue-fullcalendar'
import mavonEditor from 'mavon-editor'
// import socketIO from 'socket.io-client'
import 'normalize.css/normalize.css'
import 'mavon-editor/dist/css/index.css'
import App from './App'
import router from './router'
import Toast from './components/toast/main.js'
import axios from './api'
import store from './store'
import directives from './directives'
import { VueAMapKey } from '@/const'
// import './../static/css/base.css'
import './../static/css/base.scss'
import './../static/css/var.scss'
import './../static/css/theme.scss'

Vue.use(ElementUI)
Vue.use(VueAMap)
Vue.use(mavonEditor)
Vue.component('full-calendar', fullCalendar)
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: VueAMapKey,
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});

// socket连接
Vue.use(new VueSocketIO({
  // debug: true,
  connection: process.env.SOCKET_URL,
  // vuex: {
  //   store,
  //   actionPrefix: "SOCKET_",
  //   mutationPrefix: "SOCKET_"
  // }
}))

// 注册全局指令
Object.keys(directives).forEach(i => Vue.directive(i, directives[i]))

Vue.config.productionTip = false
Vue.prototype.$toast = Toast
Vue.prototype.$http = axios
Vue.prototype.$eventBus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>'
  render: h => h(App)
}).$mount('#app')
