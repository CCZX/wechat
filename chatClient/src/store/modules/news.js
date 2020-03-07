// const localData = window.localStorage.getItem('unreadnewslist')
// const initState = localData ? JSON.parse(localData) : []
/**
 * unreadNewsList: {roomid1: count1, roomid2: count2, ...}
 */
import { SET_UNREAD_NEWS_TYPE_MAP } from './../constants'
const state = {
  unreadNews: {},
  lastNews: {} // 好友之间最后发送的一条消息 {roomid1: {}, roomid2: {}}
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
    } else if (data.type === 'edit') {
      const { roomid, news } = data.res
      const item = {[roomid]: news}
      state.lastNews = Object.assign({}, state.lastNews, item)
    }
  }
}

const actions = {
  SET_UNREAD_NEWS({ commit }, data) {
    commit('setUnreadNews', data)
  },
  SET_LAST_NEWS({commit}, data) {
    commit('setLastNews', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
