<template>
  <div class="index-page">
    <div class="conversation-list">
      <user-list
        :currentConverssation="currentConverssation"
        @setCurrentConversation="setCurrentConversation"
      />
    </div>
    <div class="conversation-chat-area" v-loading="loading">
      <chat-area
        :currentConverssation="currentConverssation"
        :setLoading="setLoading"
      />
    </div>
    <div class="detail"></div>
  </div>
</template>

<script>
import UserList from '@/views/user/UserList'
import ChatArea from '@/views/chat/ChatArea'
export default {
  name: 'Index',
  data() {
    return {
      currentConverssation: {},
      loading: true
    }
  },
  methods: {
    setCurrentConversation(data) {
      this.currentConverssation = data
    },
    setLoading(flag) {
      this.loading = flag
    }
  },
  components: {
    UserList,
    ChatArea
  }
}
</script>

<style lang="scss">
.index-page {
  display: flex;
  width: 100%;
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

