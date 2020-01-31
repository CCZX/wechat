<template>
  <div class="chat-area__com">
    <chat-header :currentConversation="currentConversation"/>
    <div
       :class="currentConversation.conversationType !== 'GROUP' ? 'main no-group' : 'main'"
    >
      <div class="message-list-container">
        <message-list :messagelist="messagesOutcome"/>
      </div>
      <div class="group-desc" v-if="currentConversation.conversationType === 'GROUP'">
        <group-desc :currentConversation="currentConversation" />
      </div>
    </div>
    <div class="message-edit-container">
      <div class="send-type">
        <i class="item iconfont icon-emoji" @click.stop="showEmojiCom = !showEmojiCom"></i>
        <label for="upimg">
          <el-tooltip class="item" effect="dark" content="只能上传小于 2M 的图片" placement="top">
            <i class="item el-icon-picture">
              <input
                id="upimg"
                class="img-inp upload"
                type="file"
                title="选择图片"
                accept="image/png, image/jpeg, image/gif, image/jpg"
                @change="imgInpChange"
              >
            </i>
          </el-tooltip>
        </label>
        <label for="upfile">
          <el-tooltip class="item" effect="dark" content="只能上传小于 2M 的文件" placement="top">
            <i class="item el-icon-folder">
              <input
                id="upfile"
                class="file-inp upload"
                type="file"
                title="选择文件"
                @change="fileInpChange"
              >
            </i>
          </el-tooltip>
        </label>
      </div>
      <div class="operation">
        <el-button @click="send" type="success" size="small" round>发送</el-button>
        <el-button @click="send" type="danger" size="small" round>清空</el-button>
      </div>
      <textarea class="textarea" v-model="messageText" maxlength="200" @keyup.enter="send($event)"></textarea>
      <transition name="roll">
        <custom-emoji v-if="showEmojiCom" class="emoji-component" @addemoji="addEmoji" />        
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { fromatTime } from "@/utils"
import chatHeader from "./components/Header"
import messageList from "./components/MessageList"
import { SET_UNREAD_NEWS_TYPE_MAP } from "@/store/constants"
import { conversationTypes } from '@/const'
import customEmoji from '@/components/customEmoji'
import groupDesc from './components/GroupDesc'
export default {
  props: {
    currentConversation: Object,
    setLoading: Function
  },
  data() {
    return {
      messageText: "",
      messages: [],
      showEmojiCom: false
    }
  },
  computed: {
    ...mapState("user", {
      userInfo: "userInfo"
    }),
    messagesOutcome() {
      return this.messages.filter(item => {
        return item.roomid === this.currentConversation.roomid
      })
    }
  },
  sockets: {
    receiveMessage(news) {
      console.log("收到新的消息", news)
      this.messages = [...this.messages, news]
      if (news.roomid === this.currentConversation.roomid) {
        setTimeout(() => {
          this.$store.dispatch("news/SET_UNREAD_NEWS", {
            roomid: news.roomid,
            count: 0,
            type: SET_UNREAD_NEWS_TYPE_MAP.clear
          })
        }, 0)
      }
    },
    conversationList(list) {
      console.log("当前会话列表", list)
    }
  },
  methods: {
    imgInpChange(e) {
      console.log(e)
      const [file] = e.target.files
      console.log(URL.createObjectURL(file))
    },
    fileInpChange(e) {

    },
    addEmoji(emoji = '') {
      this.messageText += emoji
    },
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
        // time: this.currentConversation.conversationType === conversationTypes.group ? fromatTime(new Date(), false) : fromatTime(new Date()),
        message: this.messageText,
        messageType: "text",
        isReadUser: [this.userInfo.name],
        conversationType: this.currentConversation.conversationType
      }
      this.messages = [...this.messages, newMessage]
      this.$socket.emit("sendNewMessage", newMessage)
      this.messageText = ""
    },
    joinChatRoom() {
      this.$socket.emit("join", this.currentConversation)
    },
    async getRecentNews() {
      /**
       * getRecentNews分为两种目前分为两种情况：1.获取两两好友之间的；2.获取群聊的
       */
      // this.setLoading(false)
      this.setLoading(true)
      const { roomid, conversationType } = this.currentConversation
      if (conversationType === conversationTypes.friend) {
        const { data, status } = await this.$http.getRecentNews({ roomid })
        this.setLoading(false)
        if (data.status === 2000 && status === 200) {
          this.messages = [...this.messages, ...data.data]
        }
      } else if (conversationType === conversationTypes.group) {
        const { data, status } = await this.$http.getRecentGroupNews({ roomid })
        this.setLoading(false)
        if (data.status === 2000 && status === 200) {
          this.messages = [...this.messages, ...data.data]
        }
      }
      
    }
  },
  components: {
    chatHeader,
    messageList,
    customEmoji,
    groupDesc
  },
  watch: {
    currentConversation(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.setLoading(true)
        this.messageText = ""
        this.messages = []
        this.joinChatRoom()
        this.getRecentNews()
      }
    }
  },
  created() {
    document.addEventListener('click', () => {
      this.showEmojiCom = false
    })
  },
};
</script>

<style lang="scss">
@import './../../../static/css/animation.scss';
.chat-area__com {
  height: 100%;
  .main {
    display: flex;
    height: calc(100% - 210px);
    width: 100%;
    .message-list-container {
      height: 100%;
      width: 75%;
    }
    .group-desc {
      height: 100%;
      width: 25%;
    }
    
  }
  .main.no-group {
    .message-list-container {
      height: 100%;
      width: 100%;
    }
    .group-desc {
      width: 0%;
    } 
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
        cursor: pointer;
        font-size: 20px;
        margin-right: 10px;
        .upload {
          display: none;
          border: none;
        }
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
      border: 0;
      border-radius: 5px;
      background-color: rgba(241, 241, 241, 0.98);
      padding: 10px;
      resize: none;
    }
    .emoji-component {
      position: absolute;
      bottom: 101%;
    }
  }
}
</style>

