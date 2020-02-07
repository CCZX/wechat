const state = {
  sysUsers: '' || JSON.parse(window.localStorage.getItem('sysusers')),
  isToCoArtBoard: false,
  currentConversation: {}
}

const mutations = {
  setSysUsers(state, data) {
    console.log('vuex set sysuser')
    state.sysUsers = data
    const dataStr = JSON.stringify(data)
    window.localStorage.setItem('sysusers', dataStr)
  },
  setIsToCoArtBoard(state, data) {
    state.isToCoArtBoard = !state.isToCoArtBoard
  },
  setCurrentConversation(state, data) {
    state.currentConversation = data
  }
}

const actions = {
  SET_SYS_USERS({commit}, data) {
    commit('setSysUsers', data)
  },
  SET_ISTOCOARTBOARD({commit}, data) {
    commit('setIsToCoArtBoard', data)
  },
  SET_CURRENT_CONVERSATION({commit}, data) {
    commit('setCurrentConversation', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
