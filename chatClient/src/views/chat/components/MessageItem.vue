<template>
  <div
    class="chat-area__message-item__com"
    :style="messageItemComStyle"
  >
    <el-avatar
      v-if="messageitem.messageType !== 'sys'"
      class="avatar"
      size="large"
      :src="messageitem.senderId === userInfo._id ? 'http://localhost:3333' + userInfo.photo : 'http://localhost:3333' + messageitem.senderAvatar"
      @error="() => true"
    >
      <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt srcset>
    </el-avatar>
    <div
      class="message-info"
      :style="messageitem.messageType === 'sys' ? 'width: 100%' : ''"
    >
      <span class="secondary-font time">
        <span
          :style="messageitem.senderId === userInfo._id ? {'float': 'right'} : {}"
        >{{messageitem.time}}</span>
      </span>
      <div
        :class="contentClassName"
      >
        <span
          v-if="messageitem.messageType === 'text'"
          :style="messageitem.senderId === userInfo._id ? {'background-color': 'hsla(149, 78%, 53%, 1)', 'float': 'right'} : {}"
          class="primary-font text"
        >
          <el-popover
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
            </div>
            <i
              slot="reference"
              :class="this.messageitem.senderId === this.userInfo._id ? 'operation isme' : 'operation not-isme'"
              :style="this.messageitem.senderId === this.userInfo._id ? 'left: 0' : ''"
            />
          </el-popover>
          {{messageitem.message}}
        </span>
        <span
          v-else-if="messageitem.messageType === 'img'"
          :style="messageitem.senderId === userInfo._id ? {'float': 'right'} : {}"
          class="primary-font text" style="cursor: zoom-in">
          <img width="200" :src="messageitem.message" alt="图片" @click="preview(messageitem.message)">
        </span>
        <span
          v-else-if="messageitem.messageType === 'sys'"
          class="secondary-font sys-tips"
        >
          系统提示：{{messageitem.message}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["messageitem"],
  data() {
    return {
      currentMsg: {}
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
    } 
  },
  methods: {
    preview(url) {
      this.$emit('seturl', url)
    }
  },
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
      .img-wrapper {
        display: inline-block;
        cursor: zoom-in;
        min-height: 50px;
        min-width: 50px;
        background-color: #e5e9ef;
      }
    }
    .content {
      margin-top: 50px;
      position: relative;
      margin-top: 5px;
      white-space: wrap;
      word-break: break-word;
      .text {
        position: relative;
        display: inline-block;
        border-radius: 10px;
        padding: 10px;
        background-color: hsla(201, 100%, 55%, 1);
        .operation {
          position: absolute;
          right: 0;
          top: 0;
          width: 0;
          height: 0;
          cursor: pointer;
        }
        .operation.not-isme {
          border-top-right-radius: 10px;
          border-bottom-left-radius: 15px;
          border-top: 15px solid #c35673;
          border-left: 15px solid transparent;
        }
        .operation.isme {
          border-top-left-radius: 10px;
          border-bottom-right-radius: 15px;
          border-top: 15px solid #c35673;
          border-right: 15px solid transparent;
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

