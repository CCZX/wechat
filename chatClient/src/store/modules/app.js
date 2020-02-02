const state = {
  sysUsers: '' || JSON.parse(window.localStorage.getItem('sysusers'))
}

const mutations = {
  setSysUsers(state, data) {
    console.log('vuex set sysuser')
    state.sysUsers = data
    const dataStr = JSON.stringify(data)
    window.localStorage.setItem('sysusers', dataStr)
  }
}

const actions = {
  SET_SYS_USERS({commit}, data) {
    commit('setSysUsers', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
