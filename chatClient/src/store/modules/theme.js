import { LocalStorageManager } from '@/utils'
const localStorageManager = new LocalStorageManager()

const state = {
  /**透明度 */
  opacity: localStorageManager.getJson('theme-opacity')  || 0.75,
  /**模糊度，filter: blur(10px) */
  blur: localStorageManager.getJson('theme-blur') || 10,
  /**
   * 背景图片，用户上传的图片会转为base64存在localStorage中
   * 系统默认的有abstract.jpg\city.jpg\ocean.jpg
   * 区分系统自带和用户自定义判断是否包含base64
   * */
  bgImg: localStorageManager.getStr('theme-bgimg') || 'abstract',
  notifySound: localStorageManager.getStr('theme-notifysound') || 'default',
  // isNotifySound: localStorageManager.get('theme-blur') || 10
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
  },
  setNotifySound(state, value) {
    localStorageManager.set('theme-notifysound', value)
    state.notifySound = value
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
  },
  SET_NOTIFY_SOUND({commit}, value) {
    commit('setNotifySound', value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
