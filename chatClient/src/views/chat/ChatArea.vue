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
        <i class="item el-icon-picture" @click.stop="showUpImgCom = !showUpImgCom" />
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
      <textarea class="textarea" v-model="messageText" maxlength="200" @keydown.enter="send($event)"></textarea>
      <transition name="roll">
        <up-img class="emoji-component" v-if="showUpImgCom" :token="token" @getstatus="getImgUploadResult" :getstatus="getImgUploadResult" />
      </transition>
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
import { conversationTypes, uploadImgStatusMap, qiniu_URL } from '@/const'
import customEmoji from '@/components/customEmoji'
import upImg from '@/components/customUploadImg'
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
      showEmojiCom: false,
      showUpImgCom: false,
      token: ''
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
    generatorMessageCommon() {
      return {
        roomid: this.currentConversation.roomid,
        senderId: this.userInfo._id,
        snderName: this.userInfo.name,
        senderNickname: this.userInfo.nickname,
        senderAvatar: this.userInfo.photo,
        time: fromatTime(new Date()),
        isReadUser: [this.userInfo.name],
        conversationType: this.currentConversation.conversationType
      }
    },
    getImgUploadResult(res) {
      if (res.status === uploadImgStatusMap.error) {
        this.$message.error('图片上传失败！')
        return
      }
      if (res.status === uploadImgStatusMap.complete) {
        const img_URL = qiniu_URL + res.data.key
        console.log(img_URL)
        const common = this.generatorMessageCommon()
        const newMessage = {
          ...common,
          message: img_URL,
          messageType: "img", // emoji/text/img/file/sys
        }
        this.messages = [...this.messages, newMessage]
        this.$socket.emit("sendNewMessage", newMessage)
        this.messageText = ""
      }
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
      const common = this.generatorMessageCommon()
      const newMessage = {
        // time: this.currentConversation.conversationType === conversationTypes.group ? fromatTime(new Date(), false) : fromatTime(new Date()),
        ...common,
        message: this.messageText,
        messageType: "text",
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
      
    },
    handlerShowEmoji() {
      this.showEmojiCom = false
      this.showUpImgCom = false
    }
  },
  components: {
    chatHeader,
    messageList,
    customEmoji,
    groupDesc,
    upImg
  },
  watch: {
    currentConversation(newVal, oldVal) {
      if (newVal && newVal._id) {
        this.setLoading(true)
        this.messageText = ""
        this.messages = []
        this.joinChatRoom()
        this.getRecentNews()
      }
    }
  },
  created() {
    document.addEventListener('click', this.handlerShowEmoji)
    this.getRecentNews()
    this.$http.getQiniuToken().then(res => {
      const { data } = res
      this.token = data.data
    })
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handlerShowEmoji)
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
      background-color: #e9ebee;
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

