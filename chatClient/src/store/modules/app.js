const state = {
  sysUsers: '' || JSON.parse(window.localStorage.getItem('sysusers')),
  isToCoArtBoard: false,
  currentConversation: {},
  agreeFriendValidate: false,
  recentConversation: [],
  onlineUser: []
}

const mutations = {
  setSysUsers(state, data) {
    state.sysUsers = data
    const dataStr = JSON.stringify(data)
    window.localStorage.setItem('sysusers', dataStr)
  },
  setIsToCoArtBoard(state, data) {
    state.isToCoArtBoard = !state.isToCoArtBoard
  },
  setCurrentConversation(state, data) {
    state.currentConversation = data
  },
  setAgreeFriendValidate(state, data) {
    state.agreeFriendValidate = data
  },
  setRecentConversation(state, data) {
    const res = data.data
    if (data.type === 'init') {
      state.recentConversation = res
    } else if (data.type === 'add') {
      const ids = state.recentConversation.map(item => item._id)
      const newData = !ids.includes(res._id) ? [...state.recentConversation, res] : [...state.recentConversation]
      state.recentConversation = newData
    } else if (data.type === 'delete') {
      const index = state.recentConversation.findIndex(item => item._id === res._id)
      const newData = JSON.parse(JSON.stringify(state.recentConversation))
      index !== -1 && newData.splice(index, 1)
      state.recentConversation = newData
    }
  },
  setOnlineUser(state, data) {
    state.onlineUser = data
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
  },
  SET_AGREE_FRIEND_VALIDATE({commit}, data) {
    commit('setAgreeFriendValidate', data)
  },
  SET_RECENT_CONVERSATION({commit}, data) {
    commit('setRecentConversation', data)
  },
  SET_ONLINE_USER({commit}, data) {
    commit('setOnlineUser', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
