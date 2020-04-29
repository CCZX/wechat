<template>
  <div class="chat-area__com">
    <chat-header
      :currentConversation="currentConversation"
      :set-current-conversation="setCurrentConversation"
    />
    <transition name="slide-up">
      <div class="history-msg-container" v-if="showHistoryMsg">
        <history-msg :current-conversation="currentConversation" />
      </div>
    </transition>
    <div :class="currentConversation.conversationType !== 'GROUP' ? 'main no-group' : 'main'">
      <div class="message-list-container">
        <message-list ref='messagelist'
          @load-message="loadmessage"
          :messagelist="messagesOutcome"
          :scrollbottom="scrollBottom"
          :hasmore="hasMore"
          :isloading="isLoading"
          :useanimation="useAnimation"
          :currentConversation="currentConversation"
          :last-enter-time="lastEnterTime"
          :set-last-enter-time="setLastEnterTime"
        />
      </div>
      <div class="group-desc" v-if="device !== 'Mobile' && currentConversation.conversationType === 'GROUP'">
        <group-desc :currentConversation="currentConversation" :key="datetamp" />
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
        <i class="item iconfont icon-huaban" />
        <i class="item iconfont icon-shipin" />
        <i class="item el-icon-phone-outline" />
        <span
          :class="showHistoryMsg ? 'history-btn normal-font el-icon-caret-bottom' : 'history-btn normal-font el-icon-caret-top'"
          @click="setShowHistoryMsg">历史记录</span>
      </div>
      <div class="operation">
        <el-button @click="send" type="success" size="small" round>发送</el-button>
        <el-button @click="send" type="danger" size="small" round>清空</el-button>
      </div>
      <div style="display: none" contenteditable="true" class="textarea" @input="test">

      </div>
      <textarea ref="chatInp" class="textarea" v-model="messageText" maxlength="200" @input="scrollBottom = true" @keydown.enter="send($event)"></textarea>
      <transition name="fade">
        <up-img
          v-if="showUpImgCom"
          class="emoji-component"
          :token="token"
          @getStatus="getImgUploadResult"
          @getLocalUrl="getLocalUrl"
          :get-status="getImgUploadResult"
          :get-local-url="getLocalUrl"
        />
      </transition>
      <transition name="fade">
        <custom-emoji v-if="showEmojiCom" class="emoji-component" @addemoji="addEmoji" />        
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { cloneDeep } from 'lodash'
import { fromatTime } from "@/utils"
import chatHeader from "./components/Header"
import messageList from "./components/MessageList"
import { SET_UNREAD_NEWS_TYPE_MAP } from "@/store/constants"
import { conversationTypes, uploadImgStatusMap, qiniu_URL } from '@/const'
import customEmoji from '@/components/customEmoji'
import upImg from '@/components/customUploadImg'
import groupDesc from './components/GroupDesc'
import historyMsg from './components/HistoryMsg'
import xss from '@/utils/xss'
export default {
  props: {
    currentConversation: Object,
    setLoading: Function,
    setCurrentConversation: Function
  },
  data() {
    return {
      messageText: "",
      messages: [],
      showEmojiCom: false,
      showUpImgCom: false,
      token: '', // 上传七牛云所需token
      page: 0,
      pageSize: 15,
      hasMore: true,
      showTopOperation: false,
      scrollBottom: true,
      isLoading: false,
      useAnimation: false,
      lastEnterTime: Date.now(), // 对方进入该会话的时间
      showHistoryMsg: false,
      datetamp: Date.now() // 切换群聊重新强制加载群聊详情
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
    },
    device() {
      return this.$store.state.device.deviceType
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
      // console.log("当前会话列表", list)
    }
  },
  methods: {
    test(e) {
      console.log(e, 123132)
    },
    setShowHistoryMsg() {
      this.showHistoryMsg = !this.showHistoryMsg
    },
    /**最后进入该会话的时间 */
    setLastEnterTime(time) {
      this.lastEnterTime = time
    },
    generatorMessageCommon() {
      return {
        roomid: this.currentConversation.roomid,
        senderId: this.userInfo._id,
        snderName: this.userInfo.name,
        senderNickname: this.userInfo.nickname,
        senderAvatar: this.userInfo.photo,
        time: Date.now(),
        isReadUser: [this.userInfo._id],
        conversationType: this.currentConversation.conversationType,
        currentConversation: this.currentConversation
      }
    },
    getImgUploadResult(res) {
      const { guid } = res // 图片的唯一标识
      const msgListClone = cloneDeep(this.messages)
      if (res.status === uploadImgStatusMap.error) {
        this.$message.error('图片上传失败！')
        return
      }
      if (res.status === uploadImgStatusMap.next) {
        const percent = Number((res.data && res.data.total && res.data.total.percent) || 0).toFixed(2)
        const loaded = (res.data && res.data.total && res.data.total.loaded) || 0
        const size = (res.data && res.data.total && res.data.total.size) || 0
        console.log(`图片大小：${size}，已上传：${loaded}，百分比：${percent}`)
        msgListClone.forEach(item => {
          if (item.guid === guid) {
            item.uploadPercent = Number(percent)
          }
        })
        this.messages = msgListClone
        return
      }
      if (res.status === uploadImgStatusMap.complete) {
        const img_URL = qiniu_URL + res.data.key
        const common = this.generatorMessageCommon()
        const newMessage = {
          ...common,
          message: img_URL,
          messageType: "img", // emoji/text/img/file/sys/artboard/audio/video
        }
        msgListClone.forEach(item => {
          if (item.guid === guid) {
            item.uploading = false
            delete item.uploadPercent
          }
        })
        this.messages = msgListClone
        this.$socket.emit("sendNewMessage", newMessage)
        this.$store.dispatch('news/SET_LAST_NEWS', {
          type: 'edit',
          res: {
            roomid: this.currentConversation.roomid,
            news: newMessage
          }
        })
        this.messageText = ""
      }
    },
    /**
     * 直接获取本地的地址
     */
    getLocalUrl(url, guid) {
      // return
      const common = this.generatorMessageCommon()
      const newMessage = {
        ...common,
        uploading: true,
        guid,
        message: url,
        messageType: "img",
      }
      this.messages = [...this.messages, newMessage]
      this.$store.dispatch('news/SET_LAST_NEWS', {
        type: 'edit',
        res: {
          roomid: this.currentConversation.roomid,
          news: newMessage
        }
      })
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
        ...common,
        message: xss(this.messageText),
        messageType: "text",
      }
      this.messages = [...this.messages, newMessage]
      this.$socket.emit("sendNewMessage", newMessage)
      this.$store.dispatch('news/SET_LAST_NEWS', {
        type: 'edit',
        res: {
          roomid: this.currentConversation.roomid,
          news: newMessage
        }
      })
      this.messageText = ""
    },
    joinChatRoom() {
      this.$socket.emit("join", this.currentConversation)
    },
    async getRecentNews(init = true) {
      /**
       * getRecentNews分为两种目前分为两种情况：1.获取两两好友之间的；2.获取群聊的
       */
      if (this.isLoading) return // 防止重复发起请求
      this.isLoading = true
      init && this.setLoading(true) // 只有在第一次加载的时候才让ChatArea有loading动画，后面加载时不显示
      const { roomid, conversationType } = this.currentConversation
      const params = {
        roomid,
        page: this.page,
        pageSize: this.pageSize
      }
      if (conversationType === conversationTypes.friend) {
        const { data, status } = await this.$http.getRecentNews(params)
        this.setLoading(false)
        if (data.status === 2000 && status === 200) {
          this.isLoading = false
          data.data.reverse()
          this.messages = [...data.data, ...this.messages]
          if (data.data.length < this.pageSize) {
            this.hasMore = false
            return
          }
          this.page++
        }
      } else if (conversationType === conversationTypes.group) {
        const { data, status } = await this.$http.getRecentGroupNews(params)
        this.setLoading(false)
        this.isLoading = false
        if (data.status === 2000 && status === 200) {
          data.data.reverse()
          this.messages = [...data.data, ...this.messages]
          if (data.data.length < this.pageSize) {
            this.hasMore = false
            return
          }
          this.page++
        }
      }
    },
    handlerShowEmoji() {
      this.showEmojiCom = false
      this.showUpImgCom = false
    },
    loadmessage() {
      this.scrollBottom = false
      this.useAnimation = true
      if (this.hasMore) {
        this.getRecentNews(false)
      }
    },
    watchWebRtcMsg() {
      this.$eventBus.$on('web_rtc_msg', (e) => {
        const { type } = e
        // const 
        const common = this.generatorMessageCommon()
        const newMessage = {
          ...common,
          message: '',
          messageType: type
        }
        this.messages = [...this.messages, newMessage]
        this.$socket.emit("sendNewMessage", newMessage)
        this.$store.dispatch('news/SET_LAST_NEWS', {
          type: 'edit',
          res: {
            roomid: this.currentConversation.roomid,
            news: newMessage
          }
        })
      })
    },
    /**聊天内容输入框自动聚焦 */
    chatInpAutoFocus() {
      this.$nextTick(() => {
        this.$refs.chatInp.focus();
      })
    }
  },
  components: {
    chatHeader,
    messageList,
    customEmoji,
    groupDesc,
    upImg,
    historyMsg
  },
  watch: {
    currentConversation(newVal, oldVal) {
      if (newVal && newVal._id) {
        this.chatInpAutoFocus()
        this.page = 0
        this.scrollBottom = true
        this.showHistoryMsg = false
        this.setLoading(true)
        this.messageText = ""
        this.messages = []
        this.hasMore = true
        this.joinChatRoom()
        this.getRecentNews()
        this.datetamp = Date.now()
      }
    }, deep: true, immediate: true
  },
  created() {
    console.log('chatArea created')
    document.addEventListener('click', this.handlerShowEmoji)
    this.getRecentNews()
    this.$http.getQiniuToken().then(res => {
      const { data } = res
      this.token = data.data
    })
  },
  mounted() {
    this.watchWebRtcMsg()
  },
  beforeDestroy() {
    console.log('chatArea BeforeDestroy')
    document.removeEventListener('click', this.handlerShowEmoji)
  },
};
</script>

<style lang="scss">
@import './../../../static/css/animation.scss';
.chat-area__com {
  position: relative;
  height: 100%;
  .history-msg-container {
    position: absolute;
    z-index: 1004;
    height: calc(100% - 210px);
    width: 100%;
  }
  .main {
    display: flex;
    position: relative;
    height: calc(100% - 210px);
    width: 100%;
    .message-list-container {
      position: relative;
      height: 100%;
      width: 75%;
      flex: 1;
      .top-operation {
        position: absolute;
      }
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
      position: relative;
      padding: 5px 10px 0;
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
      .history-btn {
        position: absolute;
        right: 5px;
        cursor: pointer;
      }
    }
    .operation {
      position: absolute;
      bottom: 5px;
      right: 2px;
    }
    .textarea {
      overflow-x: hidden;
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
      img {
        width: 50px;
      }
    }
    .emoji-component {
      position: absolute;
      bottom: 101%;
    }
  }
}
</style>
