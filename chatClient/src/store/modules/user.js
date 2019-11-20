import userApi from '@/api/modules/user'

const state = {
  isLogin: false || window.sessionStorage.getItem('isLogin'),
  userInfo: '' || window.sessionStorage.getItem('userInfo')
}

const mutations = {
  login(state, data) {
    state.isLogin = true,
    state.userInfo = data
    let dataString = JSON.stringify(data)
    window.sessionStorage.setItem('userInfo', dataString)
    window.sessionStorage.setItem('isLogin', true)
  },
  logout(state) {
    state.isLogin = false,
    state.userInfo = ''
    window.sessionStorage.setItem('userInfo', '')
    window.sessionStorage.setItem('isLogin', false)
  }
}

const actions = {
  LOGIN({commit}, data) {
    commit('login', data)
  },
  LOGOUT({commit}, data) {
    commit('logout', data)
  }
}

export default {
  state,
  mutations,
  actions
}
