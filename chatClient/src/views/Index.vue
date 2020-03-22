<template>
  <div class="index-page">
    <div class="conversation-list">
      <conversation-list
        :currentConversation="currentConversation"
        :set-current-conversation="setCurrentConversation"
        @setCurrentConversation="setCurrentConversation"
      />
    </div>
    <div class="conversation-chat-area" v-loading="loading">
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
            this.$store.dispatch('app/SET_CURRENT_CONVERSATION', newVal)
            this.$store.dispatch('app/SET_RECENT_CONVERSATION', {type: 'add', data: newVal})
            saveRecentConversationToLocal(newVal._id)
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
.index-page {
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
  .conversation-list {
    width: 30%;
    border-right: 1px solid #cccccc;
  }
  .conversation-chat-area {
    position: relative;
    width: 70%;
    .no-conversation {
      text-align: center;
    }
  }
}
</style>
