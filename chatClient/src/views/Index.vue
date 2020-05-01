<template>
  <div class="index-page">
    <transition name="fade-left">
      <div
        v-show="device === 'Desktop' || (device === 'Mobile' && currentUI === 'conversation')"
        :class="device === 'Mobile' ? 'conversation-list mobile' : 'conversation-list'"
      >
        <conversation-list
          :currentConversation="currentConversation"
          :set-current-conversation="setCurrentConversation"
          @setCurrentConversation="setCurrentConversation"
        />
      </div>
    </transition>
    <transition name="fade-right">
      <div
        v-show="device === 'Desktop' || (device === 'Mobile' && currentUI === 'chatArea')"
        v-loading="loading"
        :class="device === 'Mobile' ? 'conversation-chat-area mobile' : 'conversation-chat-area'"
      >
        <chat-area
          v-if="currentConversation && currentConversation._id"
          :currentConversation="currentConversation"
          :setLoading="setLoading"
          :set-current-conversation="setCurrentConversation"
        />
        <div class="no-conversation hor-ver-center" v-else>
          <chat-svg width="400" height="300" />
          <p>聊天~打开心灵的窗户</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ConversationList from '@/views/conversation/ConversationList'
import ChatArea from '@/views/chat/ChatArea'
import { SET_UNREAD_NEWS_TYPE_MAP } from '@/store/constants'
import { fromatTime, saveRecentConversationToLocal } from '@/utils'
import weather from '@/components/customWeather'
import partTitle from '@/components/partTitle'
import chatSvg from '@/SVGComponents/chat'
// import AMap from '@/components/customMap'
export default {
  name: 'Index',
  data() {
    return {
      currentConversation: {},
      loading: false,
      matterLevelMap: { 
        'danger': '紧急事项' ,
        'warning': '重要事项' ,
        'normal': '一般事项' ,
        'info': '不重要事项'
      }
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    },
    device() {
      return this.$store.state.device.deviceType
    },
    currentUI() {
      return this.$store.state.device.currentUI
    }
  },
  watch: {
    currentConversation: {
      handler(newVal, oldVal) {
        if (!newVal || !newVal.roomid) return
        try {
          if(newVal.roomid !== oldVal.roomid) {
            this.$store.dispatch('news/SET_UNREAD_NEWS', {
              roomid: this.currentConversation && this.currentConversation.roomid,
              count: 0,
              type: SET_UNREAD_NEWS_TYPE_MAP.clear
            })
            this.$store.dispatch('news/SET_LAST_NEWS', {type: 'default', roomid: newVal.roomid})
            this.$store.dispatch('app/SET_CURRENT_CONVERSATION', newVal)
            this.$store.dispatch('app/SET_RECENT_CONVERSATION', {type: 'add', data: newVal})
            // 将该会话下的消息设置为已读begin
            newVal.conversationType === "FRIEND" && this.$http.userIsReadMsg({
              roomid: newVal.roomid, userId: this.userInfo._id
            }).then(res => {
              // 用户切换会话来阅读消息
              if (res.status >= 400 || res.data.status !== 2000) return
              this.$socket.emit('isReadMsg', {
                roomid: newVal.roomid,
                status: true
              }) // 1. 提示对方用户进入该会话
              if (oldVal.conversationType === "FRIEND") {
                this.$socket.emit('isReadMsg', {
                  roomid: oldVal.roomid || '',
                  status: false
                })
              } // 2. 提示对方用户退出该会话
              // end
            })
            // 将该会话下的消息设置为已读end
            saveRecentConversationToLocal(newVal)
          }
        } catch (error) {
          console.log('errrrr', error)
        }
      }, deep: true, immediate: true
    }
  },
  methods: {
    setCurrentConversation(data) {
      this.currentConversation = data
    },
    setLoading(flag) {
      this.loading = flag
    }
  },
  components: {
    ConversationList,
    ChatArea,
    weather,
    partTitle,
    chatSvg
    // AMap
  }
}
</script>

<style lang="scss">
@import './../../static/css/animation.scss';
.index-page {
  display: flex;
  width: 100%;
  // height: calc(100vh - 60px);
  height: 100%;
  .conversation-list {
    width: 30%;
    border-right: 1px solid #cccccc;
    background-color: var(--primary-bgcolor-4);
    &.mobile {
      position: absolute;
      width: 100%;
    }
  }
  .conversation-chat-area {
    position: relative;
    width: 70%;
    &.mobile {
      // position: absolute;
      width: 100%;
    }
    .no-conversation {
      text-align: center;
    }
  }
}
</style>
