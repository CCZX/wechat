// const localData = window.localStorage.getItem('unreadnewslist')
// const initState = localData ? JSON.parse(localData) : []
/**
 * unreadNewsList: {roomid1: count1, roomid2: count2, ...}
 */
import { SET_UNREAD_NEWS_TYPE_MAP } from './../constants'
const state = {
  unreadNews: {},
  lastNews: {}, // 好友之间最后发送的一条消息 {roomid1: {}, roomid2: {}}
  userIsReadMsg: { // 好友是否已读你发送的消息

  }
}

/**
 * 提交data的格式：{roomid: '标识消息对应的房间id', count: '标识未读数', type: 'ADD\CLEAR\REPLACE'}
 */
const mutations = {
  setUnreadNews(state, data) {
    const { roomid, count, type } = data
    if (type === SET_UNREAD_NEWS_TYPE_MAP.add) {
      const oldCount = state.unreadNews[roomid] === undefined ? 0 : state.unreadNews[roomid]
      const item = {[roomid]: oldCount + 1}
      state.unreadNews = Object.assign({}, state.unreadNews, item)    
    } else if (type === SET_UNREAD_NEWS_TYPE_MAP.clear) {
      const item = {[roomid]: 0}
      state.unreadNews = Object.assign({}, state.unreadNews, item)
    } else {
      const item = {[roomid]: count}
      state.unreadNews = Object.assign({}, state.unreadNews)
    }
  },
  setLastNews(state, data) {
    if (data.type === 'init') {
      state.lastNews = data.res
    } else if (data.type === 'concat') {
      state.lastNews = Object.assign({}, state.lastNews, data.res)
    } else if (data.type === 'edit') {
      const { roomid, news } = data.res
      const item = {[roomid]: news}
      state.lastNews = Object.assign({}, state.lastNews, item)
    } else if (data.type === 'default') { // 判断是否为新添加的会话
      const { roomid } = data
      if (roomid in state.lastNews) return
      const item = {[roomid]: {time: Date.now(), messageType: 'text', message: ''}}
      state.lastNews = Object.assign({}, state.lastNews, item)
    }
  },
  setUserIsReadMsg(state, data) {
    const { roomid, status } = data
    const newData = {...state.userIsReadMsg} || {}
    for (const key in newData) {
      if (newData.hasOwnProperty(key)) {
        newData[key] = false
      }
    }
    newData[roomid] = status
    state.userIsReadMsg = newData
  }
}

const actions = {
  SET_UNREAD_NEWS({ commit }, data) {
    commit('setUnreadNews', data)
  },
  SET_LAST_NEWS({commit}, data) {
    commit('setLastNews', data)
  },
  SET_USER_IS_READ_MSG({commit}, data) {
    commit('setUserIsReadMsg', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
