<template>
  <div class="chat-area__com">
    <chat-header :currentConversation="currentConversation" />
    <div class="message-list-container">
      <message-list :messagelist="messagesOutcome" />
    </div>
    <div class="message-edit-container">
      <div class="send-type">
        <i class="item el-icon-folder"></i>
        <i class="item el-icon-picture"></i>
      </div>
      <div class="operation">
        <el-button @click="send" type="success" size="small" round>发送</el-button>
        <el-button @click="send" type="danger" size="small" round>清空</el-button>
      </div>
      <textarea
        class="textarea"
        v-model="messageText"
        maxlength="200"
        @keyup.enter="send($event)"
      >
      </textarea>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { fromatTime } from '@/utils'
import chatHeader from './components/Header'
import messageList from './components/MessageList'
import { SET_UNREAD_NEWS_TYPE_MAP } from '@/store/constants'
export default {
  props: {
    currentConversation: Object,
    setLoading: Function
  },
  data() {
    return {
      messageText: '',
      messages: []
    }
  },
  computed: {
    ...mapState('user', {
      userInfo: 'userInfo'
    }),
    messagesOutcome() {
      return this.messages.filter(item => {
        return item.roomid === this.currentConversation.roomid
      })
    }
  },
  sockets: {
    receiveMessage(news) {
      console.log('收到新的消息', news)
      this.messages = [...this.messages, news]
      if (news.roomid === this.currentConversation.roomid) {
        console.log("清除当前未读消息")
        setTimeout(() => {
          this.$store.dispatch('news/SET_UNREAD_NEWS', {
          roomid: news.roomid,
          count: 0,
          type: SET_UNREAD_NEWS_TYPE_MAP.clear
        })
        }, 0);
      }
    },
    conversationList(list) {
      console.log('当前会话列表', list)
    }
  },
  methods: {
    send(e) {
      e.preventDefault()
      if (!this.messageText) {
        return
      }
      const newMessage = {
        roomid: this.currentConversation.roomid,
        senderId: this.userInfo._id,
        snderName: this.userInfo.name,
        senderNickname: this.userInfo.nickname,
        senderAvatar: this.userInfo.photo,
        time: fromatTime(new Date()),
        message: this.messageText,
        messageType: "text",
        isReadUser: [this.userInfo.name]
      }
      this.messages = [...this.messages, newMessage]
      this.$socket.emit('sendNewMessage', newMessage)
      this.messageText = ''
    },
    joinChatRoom() {
      this.$socket.emit('join', this.currentConversation)
    },
    async getRecentNews() {
      // this.setLoading(false)
      this.setLoading(true)
      const { roomid } = this.currentConversation
      const { data, status } = await this.$http.getRecentNews({roomid})
      this.setLoading(false)
      if (data.status === 2000 && status === 200) {
        this.messages = [...this.messages, ...data.data]
      }
    }
  },
  components: {
    chatHeader,
    messageList
  },
  watch: {
    currentConversation(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.setLoading(true)
        this.messageText = ''
        this.messages = []
        this.joinChatRoom()
        this.getRecentNews()
      }
    }
  }
}
</script>

<style lang="scss">
.chat-area__com {
  height: 100%;
  .message-list-container {
    height: calc(100% - 210px);
  }
  .message-edit-container {
    box-sizing: border-box;
    position: relative;
    height: 150px;
    border-top: 1px solid #cccccc;
    .send-type {
      padding: 0 10px;
      height: 25px;
      .item {
        font-size: 20px;
        margin-right: 10px;
      }
    }
    .operation {
      position: absolute;
      bottom: 5px;
      right: 2px;
    }
    .textarea {
      box-sizing: border-box;
      height: calc(100% - 30px);
      width: 100%;
      outline: none;
      border: none;
      padding: 0 10px;
    }
  }
}
</style>

