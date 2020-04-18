<template>
  <div class="recent-conversation-list" v-loading="isLoading">
    <transition-group name="slide-up" appear>
      <conversation-item
        v-for="item in outcomeConversationList"
        :key="item._id"
        :conversationInfo="item"
        :currentConversation="currentConversation"
        :recent-conversation="conversationList"
        @setCurrentConversation="setCurrentConversation"
        @click.native="changeCurrentConversation(item)"
        type="recent"
      />
    </transition-group>
    <div class="empty hor-ver-center" v-if="!outcomeConversationList.length">
      <empty-svg width="200" height="200" />
      <span class="secondary-font">最近没有聊天好友</span>
    </div>
  </div>
</template>

<script>
import { conversationTypes } from '@/const'
import { arrUnique } from '@/utils'
import conversationItem from './ConversationItem'
import EmptySvg from '@/SVGComponents/empty'
export default {
  props: ['currentConversation', 'setCurrentConversation'],
  data() {
    return {
      conversationList: [],
      lastNewsMap: {},
      isLoading: false
    }
  },
  computed: {
    userInfo() { // 用户信息
      return this.$store.state.user.userInfo
    },
    // lastNews() { // 最后发送的消息
    //   return this.$store.state.news.lastNews
    // },
    friendBeizhu() { // 好友备注Map {id2: '备注1', id1: '备注2'}
      return this.userInfo.friendBeizhu || {}
    },
    recentConversation() {
      return this.$store.state.app.recentConversation
    },
    outcomeConversationList() { // 带有备注，最后消息信息的会话列表
      const conversationList = JSON.parse(JSON.stringify(this.conversationList))
      return conversationList.length && conversationList.map(item => {
        item.beizhu = this.friendBeizhu[item._id] ? this.friendBeizhu[item._id] : ''
        item.lastNews = this.lastNewsMap[item.roomid] ? this.lastNewsMap[item.roomid] : ''
        item.lastNewsTime = this.lastNewsMap[item.roomid] ?
            (this.lastNewsMap[item.roomid].time ? new Date(this.lastNewsMap[item.roomid].time) : new Date(Date.now()-2000)) :
            new Date(Date.now()-2000) // -2000ms为了解决没有最近消息的会话的lastNews一直为当前时间（这样会和新发送的消息的会话冲突）
        return item
      }).sort((a, b) => {
        return b.lastNewsTime - a.lastNewsTime
      })
      // let res = []
      // this.conversationList.forEach(item => {
      //   let resItem = {}
      //   resItem.beizhu = this.friendBeizhu[item._id] ? this.friendBeizhu[item._id] : ''
      //   resItem.lastNews = this.lastNewsMap[item.roomid] ? this.lastNewsMap[item.roomid] : ''
      //   res.push({...resItem, ...item})
      //   console.log(res)
      // })
      // return res
    }
  },
  methods: {
    async getRecentConversation() {
      this.isLoading = true
      const recentFriendIdsStr = window.localStorage.getItem('coMessager-recentConversation-friend') || ''
      const recentFriendIds = arrUnique(recentFriendIdsStr.split(',')).filter(item => item) // 去重
      const { data } = await this.$http.getRecentConversationList({
        userId: this.userInfo._id,
        recentFriendIds
      })
      const list = data.data
      const myId = this.userInfo._id
      const conversationList = (list || []).map(item => {
        let res = {}
        res.createDate = item.createDate
        res.roomid = item.userM._id + '-' + item.userY._id
        if (item.userM._id === myId && item.userY._id !== myId) {
          res = {
            ...res, ...item.userY, 
            conversationType: conversationTypes.friend,
            myNickname: this.userInfo.nickname,
            myId: this.userInfo._id,
            myAvatar: this.userInfo.photo
          }
        } else {
          res = {
            ...res, ...item.userM, 
            conversationType: conversationTypes.friend,
            myNickname: this.userInfo.nickname,
            myId: this.userInfo._id,
            myAvatar: this.userInfo.photo
          }
        }
        return res
      })
      this.$store.dispatch('app/SET_RECENT_CONVERSATION', {type: 'init', data: conversationList})
      // 获取最后一条消息存入Vuex
      const reqArr = []
      conversationList.forEach(item => {
        const req = this.$http.getLastNews({roomid: item.roomid})
        reqArr.push(req)
      })
      Promise.all(reqArr).then(res => {
        const lastNewsArr = res.map(item => {
          return item.data.data
        })
        const lastNewsMap = lastNewsArr.reduce((map, item) => {
          item ? map[item.roomid] = item : null
          return map
        }, {})
        this.$store.dispatch('news/SET_LAST_NEWS', {
          type: 'init',
          res: lastNewsMap
        })
        this.isLoading = false
      }).catch(err => {
        console.log(err)
      })
      // end
      this.conversationList = conversationList
    },
    async getRecentGroupConversation() {
      const recentGroupIdsStr = window.localStorage.getItem('coMessager-recentConversation-group') || ''
      const recentGroupIds = arrUnique(recentGroupIdsStr.split(',')).filter(item => item) // 去重
      this.$http.getRecentGroupConversation({
        userId: this.userInfo._id,
        groupIds: recentGroupIds
      }).then(res => {
        if (res.data.status === 2000) {
          const groupList = res.data.data
          groupList.forEach(item => {
            item.conversationType = 'GROUP'
            item.isGroup = true
            item.roomid = item.groupId._id
          })
          const groupRoomids = groupList.map(item => item.groupId._id)
          const reqArr = []
          groupRoomids.forEach(item => {
            const req = this.$http.getGroupLastNews({roomid: item})
            reqArr.push(req)
          })
          Promise.all(reqArr).then(res => {
            const lastNewsArr = res.map(item => {
              return item.data.data
            })
            console.log(lastNewsArr)
            const lastNewsMap = lastNewsArr.reduce((map, item) => {
              item ? map[item.roomid] = item : null
              return map
            }, {})
            this.$store.dispatch('news/SET_LAST_NEWS', {
              type: 'concat',
              res: lastNewsMap
            })
            this.isLoading = false
          }).catch(err => {
            console.log(err)
          })
          this.conversationList = [...this.conversationList, ...groupList]
          this.$store.dispatch('app/SET_RECENT_CONVERSATION', {type: 'init', data: this.conversationList})
        }
      })
    },
    changeCurrentConversation(item) {
      this.$emit('setCurrentConversation', item)
    }
  },
  watch: {
    '$store.state.app.recentConversation': {
      handler(newVal, oldVal) {
        console.log(newVal)
        this.conversationList = newVal.filter(item => Object.keys(item).length > 0)
      }, deep: true, immediate: true
    },
    '$store.state.news.lastNews': {
      handler(newVal, oldVal) {
        this.lastNewsMap = newVal
      }
    }
  },
  components: {
    conversationItem,
    EmptySvg
  },
  async created() {
    await this.getRecentConversation()
    this.getRecentGroupConversation()
  },
}
</script>

<style lang="scss">
.recent-conversation-list {
  @import './../../../static/css/animation.scss';
  position: relative;
  height: 510px;
  overflow-x: hidden;
  .empty {
    text-align: center;
  }
}
</style>
