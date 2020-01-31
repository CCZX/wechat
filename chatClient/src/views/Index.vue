<template>
  <div class="index-page">
    <div class="conversation-list">
      <conversation-list
        :currentConversation="currentConversation"
        @setCurrentConversation="setCurrentConversation"
      />
    </div>
    <div class="conversation-chat-area" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <chat-area
        :currentConversation="currentConversation"
        :setLoading="setLoading"
      />
    </div>
    <div class="detail"></div>
  </div>
</template>

<script>
import ConversationList from '@/views/conversation/ConversationList'
import ChatArea from '@/views/chat/ChatArea'
import { SET_UNREAD_NEWS_TYPE_MAP } from '@/store/constants'
export default {
  name: 'Index',
  data() {
    return {
      currentConversation: {},
      loading: true
    }
  },
  sockets: {
    receiveMessage(news) {
      this.$store.dispatch('news/SET_UNREAD_NEWS', {
        roomid: news.roomid,
        count: 1,
        type: 'ADD'
      })
    },
  },
  watch: {
    currentConversation: {
      handler(newVal) {
        newVal.roomid && this.$store.dispatch('news/SET_UNREAD_NEWS', {
          roomid: this.currentConversation.roomid,
          count: 0,
          type: SET_UNREAD_NEWS_TYPE_MAP.clear
        })
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
    ChatArea
  }
}
</script>

<style lang="scss">
.index-page {
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
  .conversation-list {
    width: 25%;
    border-right: 1px solid #cccccc;
  }
  .conversation-chat-area {
    width: 60%;
    border-right: 1px solid #cccccc;
  }
  .detail {
    width: 15%
  }
}
</style>

