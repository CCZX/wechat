import { LocalStorageManager } from '@/utils'
const localStorageManager = new LocalStorageManager()

const state = {
  /**透明度 */
  opacity: localStorageManager.get('theme-opacity')  || 0.75,
  /**模糊度，filter: blur(10px) */
  blur: localStorageManager.get('theme-blur') || 10
}

const mutations = {
  setOpacity(state, value) {
    localStorageManager.set('theme-opacity', value)
    state.opacity = value
  },
  setBlur(state, value) {
    localStorageManager.set('theme-blur', value)
    state.blur = value
  }
}

const actions = {
  SET_OPACITY({commit}, value) {
    commit('setOpacity', value)
  },
  SET_BLUR({commit}, value) {
    commit('setBlur', value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
