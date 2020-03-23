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
      <span class="secondary-font header"
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
          class="primary-font text"
          :style="messageWraperStyle"
         >
          <span
            :is="messageTypesCmp[messageitem.messageType+'cmp']"
            :message="messageitem"
            :img-type-msg-list="imgTypeMsgList"
          />
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
  props: ["messageitem", "imgTypeMsgList", "currentConversation"],
  data() {
    return {
      IMG_URL: process.env.IMG_URL,
      currentMsg: {},
      MSG_TYPES,
      messageTypesCmp, // 消息组件Map
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
        res = this.messageitem.senderId === this.userInfo._id ? 'content isme' : 'content'
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

    }
  },
  filters: {
    formatDateToZH(val) {
      return formatDateToZH(val)
    }
  }
};
</script>

<style lang="scss">
.msg-operation-card-body {
  text-align: center;
  .operation-item {
    .oper-text {
      margin-left: 5px;
    }
  }
}
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
    .sys-content {
      margin-top: 50px;
      position: relative;
      margin-top: 5px;
      white-space: wrap;
      word-break: break-word;
      .sys-tips {
        color: hsla(201, 100%, 55%, 1);
      }
    }
    .img-content {
      position: relative;
      margin-top: 5px;
    }
    .content {
      position: relative;
      margin-top: 5px;
      white-space: wrap;
      word-break: break-word;
      .text {
        cursor: pointer;
        position: relative;
        display: inline-block;
        border-radius: 10px;
        padding: 10px;
        background-color: hsla(201, 100%, 55%, 1);
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
    .content.isme {
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
