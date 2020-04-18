import { LocalStorageManager } from '@/utils'
const localStorageManager = new LocalStorageManager()

const state = {
  /**透明度 */
  opacity: localStorageManager.get('theme-opacity')  || 0.75,
  /**模糊度，filter: blur(10px) */
  blur: localStorageManager.get('theme-blur') || 10,
  /**
   * 背景图片，用户上传的图片会转为base64存在localStorage中
   * 系统默认的有abstract.jpg\city.jpg\ocean.jpg
   * 区分系统自带和用户自定义判断是否包含base64
   * */
  bgImg: window.localStorage.getItem('theme-bgimg') === "null" || window.localStorage.getItem('theme-bgimg') === null ? 'abstract' : window.localStorage.getItem('theme-bgimg'),
  notifySound: window.localStorage.getItem('theme-notifysound') === null ||window.localStorage.getItem('theme-notifysound') === "null" ? 'pcqq' : window.localStorage.getItem('theme-notifysound'),
}

const mutations = {
  setOpacity(state, value) {
    localStorageManager.set('theme-opacity', value)
    state.opacity = value
  },
  setBlur(state, value) {
    localStorageManager.set('theme-blur', value)
    state.blur = value
  },
  setBgImg(state, value) {
    localStorageManager.set('theme-bgimg', value)
    state.bgImg = value
  }
}

const actions = {
  SET_OPACITY({commit}, value) {
    commit('setOpacity', value)
  },
  SET_BLUR({commit}, value) {
    commit('setBlur', value)
  },
  SET_BG_IMG({commit}, value) {
    commit('setBgImg', value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
