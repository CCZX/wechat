<template>
  <div class="chat-area__com">
    <chat-header :currentConverssation="currentConverssation" />
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
        type="textarea"
        v-model="messageText"
        resize="none"
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
export default {
  props: {
    currentConverssation: Object,
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
        return item.roomid === this.currentConverssation.roomid
      })
    }
  },
  sockets: {
    receiveMessage(data) {
      console.log('收到新的消息', data)
      this.messages = [...this.messages, data]
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
        // read: [this.userInfo.name],
        roomid: this.currentConverssation.roomid,
        senderId: this.userInfo._id,
        snderName: this.userInfo.name,
        senderNickname: this.userInfo.nickname,
        senderAvatar: this.userInfo.photo,
        time: fromatTime(new Date()),
        message: this.messageText,
        messageType: "text"
      }
      this.messages = [...this.messages, newMessage]
      this.$socket.emit('sendNewMessage', newMessage)
      this.messageText = ''
    },
    joinChatRoom() {
      this.$socket.emit('join', this.currentConverssation)
    },
    async getRecentNews() {
      this.setLoading(true)
      const { roomid } = this.currentConverssation
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
    currentConverssation(newVal, oldVal) {
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
      height: calc(100% - 25px);
      width: 100%;
      outline: none;
      border: none;
      padding: 0 10px;
      height: 100%;
    }
  }
}
</style>

