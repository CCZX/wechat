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
      <span class="secondary-font time">
        <span
          :style="messageitem.senderId === userInfo._id ? {'float': 'right'} : {}"
        >{{messageitem.time}}</span>
      </span>
      <div
        :class="contentClassName"
      >
        <!-- <el-popover
          placement="top"
          width="30"
          trigger="click"
        >
          <div class="msg-operation-card-body">
            <span class="operation-text operation-item" v-copy="messageitem.message">
              <i class="el-icon-copy-document" />
              <span class="oper-text">点击复制</span>
            </span>
            <span class="operation-text operation-item">
              <i class="el-icon-delete" />
              <span class="oper-text">点击删除</span>
            </span>
            <span class="operation-text operation-item">
              <i class="el-icon-s-flag" />
              <span class="oper-text">加入代办</span>
            </span>
            <span class="operation-text operation-item" v-copy="messageitem.message">
              <i class="el-icon-copy-document" />
              <span class="oper-text">点击复制</span>
            </span>
          </div> -->
            <!-- <span
              slot="reference"
              v-if="messageitem.messageType === MSG_TYPES.text"
              :style="messageitem.senderId === userInfo._id ? {'background-color': 'hsla(149, 78%, 53%, 1)', 'float': 'right'} : {}"
              class="primary-font text"
            >
              {{messageitem.message}}
            </span> -->
        <!-- </el-popover> -->
        <span
          class="primary-font text"
          :style="messageWraperStyle"
         >
          <span :is="messageTypesCmp[messageitem.messageType+'cmp']" :message="messageitem"></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { MSG_TYPES } from '@/const'
import messageTypes, { messageTypesCmp } from '@/components/messageTypes'
export default {
  props: ["messageitem"],
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
        res = {'flex-direction': 'row-reverse', 'margin-left': 'calc(100% - 200px)'}
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
  width: 200px;
  justify-content: space-between;
  margin-bottom: 10px;
  .avatar {
    margin-top: 10px;
  }
  .message-info {
    width: 150px;
    .time {
      display: block;
      overflow: hidden;
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
      margin-top: 50px;
      position: relative;
      margin-top: 5px;
      white-space: wrap;
      word-break: break-word;
    }
    .content {
      margin-top: 50px;
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
