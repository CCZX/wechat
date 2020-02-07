<template>
  <div class="index-page">
    <div class="conversation-list">
      <conversation-list
        :currentConversation="currentConversation"
        @setCurrentConversation="setCurrentConversation"
      />
    </div>
    <div class="conversation-chat-area" v-loading="loading">
      <chat-area
        v-if="currentConversation && currentConversation._id"
        :currentConversation="currentConversation"
        :setLoading="setLoading"
      />
      <div class="no-conversation" v-else>
        没有数据
      </div>
    </div>
    <div class="detail">
      <div class="todo">
        <el-tag>标签一</el-tag>
        <el-card class="box-card">
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </div>
      <!-- <a-map /> -->
    </div>
  </div>
</template>

<script>
import ConversationList from '@/views/conversation/ConversationList'
import ChatArea from '@/views/chat/ChatArea'
import { SET_UNREAD_NEWS_TYPE_MAP } from '@/store/constants'
// import AMap from '@/components/customMap'
export default {
  name: 'Index',
  data() {
    return {
      currentConversation: {},
      loading: false
    }
  },
  watch: {
    currentConversation: {
      handler(newVal) {
        if(newVal.roomid) {
          this.$store.dispatch('news/SET_UNREAD_NEWS', {
            roomid: this.currentConversation.roomid,
            count: 0,
            type: SET_UNREAD_NEWS_TYPE_MAP.clear
          })
          this.$store.dispatch('app/SET_CURRENT_CONVERSATION', newVal)
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
    width: 25%;
    border-right: 1px solid #cccccc;
  }
  .conversation-chat-area {
    position: relative;
    width: 55%;
    border-right: 1px solid #cccccc;
    .no-conversation {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%)
    }
  }
  .detail {
    width: 20%
  }
}
</style>
