<template>
  <div
    class="chat-area__message-item__com"
    :style="messageItemComStyle"
  >
    <el-avatar
      v-if="messageitem.messageType !== MSG_TYPES.sys"
      class="avatar"
      size="large"
      :src="messageitem.senderId === userInfo._id ? IMG_URL + userInfo.photo : IMG_URL + messageitem.senderAvatar"
      @error="() => true"
    >
      <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt srcset>
    </el-avatar>
    <div
      class="message-info"
      :style="messageitem.messageType === MSG_TYPES.sys ? 'width: 100%' : ''"
    >
      <span
        v-if="messageitem.messageType !== MSG_TYPES.sys"
        class="secondary-font header"
        :style="messageitem.senderId === userInfo._id ? {'flex-direction': 'row-reverse'} : {}"
      >
        <span v-if="currentConversation.isGroup" class="item name">
          <router-link :to="`/user/${messageitem.senderId}`" class="not-link" style="color: #606266">
            {{messageitem.senderNickname}}
          </router-link>
        </span>
        <span
          class="item time"
          :style="messageitem.senderId === userInfo._id ? {'float': 'right'} : {}"
        >{{messageitem.time | formatDateToZH}}</span>
      </span>
      <div
        :class="contentClassName"
      >
        <span
          class="primary-font message-wrapper"
          :style="messageWraperStyle"
         >
          <span
            :is="messageTypesCmp[messageitem.messageType+'cmp']"
            :message="messageitem"
            :img-type-msg-list="imgTypeMsgList"
          />
          <el-tooltip class="item" effect="dark" :content="isAllRead ? '已读' : '未读'" placement="top">
            <i
              v-if="!currentConversation.isGroup && messageitem.senderId === userInfo._id"
              :class="isAllRead ? 'is-read iconfont icon-RadioSuccess' : 'is-read iconfont icon-radio'"
            />
          </el-tooltip>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { MSG_TYPES } from '@/const'
import { formatDateToZH } from '@/utils'
import messageTypes, { messageTypesCmp } from '@/components/messageTypes'
export default {
  props: ["messageitem", "imgTypeMsgList", "currentConversation", "lastEnterTime", "setLastEnterTime"],
  data() {
    return {
      IMG_URL: process.env.IMG_URL,
      currentMsg: {},
      MSG_TYPES,
      messageTypesCmp, // 消息组件Map
      outTime: Date.now()
    }
  },
  computed: {
    ...mapState("user", {
      userInfo: "userInfo"
    }),
    contentClassName() {
      let res = ''
      if (this.messageitem.messageType === 'sys') {
        res = 'sys-content'
      } else if (this.messageitem.messageType === 'img') {
        res = 'img-content'      
      } else {
        res = this.messageitem.senderId === this.userInfo._id ? 'normal-content isme' : 'normal-content'
      }
      return res
    },
    messageItemComStyle() {
      let res = {}
      if (this.messageitem.messageType === 'sys') {
        res = {
          width: 'auto',
          'text-align': 'center'
        }
      } else if (this.messageitem.senderId === this.userInfo._id) {
        res = {'flex-direction': 'row-reverse', 'margin-left': 'calc(100% - 300px)'}
      }
      return res
    },
    messageWraperStyle() {
      let res = {}
      if (this.messageitem.messageType === MSG_TYPES.img && this.messageitem.senderId === this.userInfo._id) {
        res = {'float': 'right'}
      } else if (this.messageitem.senderId === this.userInfo._id) {
        res = {'background-color': 'hsla(149, 78%, 53%, 1)', 'float': 'right'}
      }
      return res
    },
    senderUserName() { // 发送消息人的名称，如果是好友显示备注，不是好友显示nickname

    },
    userIsReadMsg() {
      return this.$store.state.news.userIsReadMsg
    },
    isAllRead() { // 是否两个用户都阅读了消息
      const roomidArr = this.messageitem.roomid.split("-")
      // const roomidArrHash = roomidArr[0]&roomidArr[1]
      const isReadUserArr = this.messageitem.isReadUser
      const flag1 = isReadUserArr.includes(roomidArr[0]) && isReadUserArr.includes(roomidArr[1])
      const flag2 = this.userIsReadMsg[this.messageitem.roomid] || false
      return this.messageitem.time < this.lastEnterTime || flag1 || flag2
    }
  },
  filters: {
    formatDateToZH(val) {
      return formatDateToZH(val)
    }
  },
  watch: {
    userIsReadMsg: {
      handler(newVal, oldVal) {
        this.setLastEnterTime(Date.now())
      }, deep: true
    }
  },
};
</script>

<style lang="scss">
@import url('./../../../../static/iconfont/iconfont.css');
.chat-area__message-item__com {
  display: flex;
  width: 300px;
  justify-content: space-between;
  margin-bottom: 10px;
  .avatar {
    margin-top: 10px;
  }
  .message-info {
    width: 250px;
    &:hover {
      .header .time {
        opacity: 1;
      }
    }
    .header {
      display: flex;
      overflow: hidden;
      height: 14px;
      .item {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .name {
        padding: 0 5px;
        max-width: 50%;
      }
      .time {
        opacity: 0;
      }
    }
    .is-read-style {
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-right: 7px;
      color: #409EFF;
      font-size: 12px;
      cursor: pointer;
    }
    .sys-content {
      position: relative;
      display: inline-block;
      margin: 5px 0;
      white-space: wrap;
      word-break: break-word;
    }
    .img-content {
      position: relative;
      margin-top: 5px;
      display: inline-block;
      width: 100%;
      .message-wrapper {
        position: relative;
        .is-read {
          @extend .is-read-style
        }
      }
    }
    .normal-content {
      position: relative;
      margin-top: 5px;
      display: inline-block;
      width: 100%;
      white-space: wrap;
      word-break: break-word;
      .message-wrapper {
        cursor: default;
        position: relative;
        display: inline-block;
        border-radius: 10px;
        padding: 10px;
        background-color: hsla(201, 100%, 55%, 1);
        .is-read {
          @extend .is-read-style
        }
      }
      &::before {
        content: "";
        position: absolute;
        right: 100%;
        top: 7px;
        width: 0px;
        border-bottom: 5px solid transparent;
        border-right: 5px solid hsla(201, 100%, 55%, 1);
        border-top: 5px solid transparent;
      }
    }
    .normal-content.isme {
      &::before {
        display: none;
      }
      &::after {
        content: "";
        position: absolute;
        left: 100%;
        top: 7px;
        width: 0px;
        border-bottom: 5px solid transparent;
        border-left: 5px solid hsla(149, 78%, 53%, 1);
        border-top: 5px solid transparent;
      }
    }
  }
}
</style>
