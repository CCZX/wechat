/**
 * 设备信息查询
 */
import { getDeviceType, findParentNode } from '@/utils'
const deviceMap = {
  Desktop: 'Desktop',
  Mobile: 'Mobile'
}

// (function () {
  const _registerEvent = () => {
    document.addEventListener('click', (e) => {
      // conversation-list
      const conversationList = findParentNode(e.target, 'conversation-list')
      // conversationitem__cmp active
      const conversationItem = findParentNode(e.target, 'conversationitem__cmp')
      console.log({conversationList, conversationItem})
      if (conversationItem && conversationList) {
        state.currentUI = UIMap.chatArea
      }
    })
  }
  // _registerEvent()
// })()

/**
 * 针对移动端设备下，【会话列表】和【聊天区域】等...不可以同时出现的情况
 */
const UIMap = {
  conversation: 'conversation',
  chatArea: 'chatArea'
}

console.log('当前设备类型', getDeviceType())

const state = {
  deviceType: deviceMap[getDeviceType()],
  currentUI: UIMap.conversation
}

state.deviceType === deviceMap.Mobile && _registerEvent()

const mutations = {
  setCurrentUI(state, data) {
    state.currentUI = data
  }
}

const actions = {
  SET_CURRENT_UI({commit}, data) {
    commit('setCurrentUI', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
