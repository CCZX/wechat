<template>
  <div
    class="chat-area__message-item__com"
    :style="messageitem.senderId === userInfo._id ? {'flex-direction': 'row-reverse', 'margin-left': 'calc(100% - 200px)'} : ''"
  >
    <el-avatar
      class="avatar"
      size="large"
      :src="messageitem.senderId === userInfo._id ? 'http://localhost:3333' + userInfo.photo : 'http://localhost:3333' + messageitem.senderAvatar"
      @error="() => true"
    >
      <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt srcset>
    </el-avatar>
    <div class="message-info">
      <span class="secondary-font time">
        <span
          :style="messageitem.senderId === userInfo._id ? {'float': 'right'} : {}"
        >{{messageitem.time}}</span>
      </span>
      <div
        :class="messageitem.senderId === userInfo._id ? 'content isme' : 'content'"
      >
        <span
          v-if="messageitem.messageType === 'text'"
          :style="messageitem.senderId === userInfo._id ? {'background-color': 'hsla(149, 78%, 53%, 1)', 'float': 'right'} : {}"
          class="primary-font text">{{messageitem.message}}
        </span>
        <span
          v-else-if="messageitem.messageType === 'img'"
          :style="messageitem.senderId === userInfo._id ? {'background-color': 'hsla(149, 78%, 53%, 1)', 'float': 'right'} : {}"
          class="primary-font text">
          <img width="200" :src="messageitem.message" alt="图片" @click="preview(messageitem.message)">
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["messageitem"],
  computed: {
    ...mapState("user", {
      userInfo: "userInfo"
    })
  },
  methods: {
    preview(url) {
      this.$emit('seturl', url)
    }
  },
};
</script>

<style lang="scss">
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
    .content {
      margin-top: 50px;
      position: relative;
      margin: 5px 0 0 0;
      white-space: wrap;
      word-break: break-word;
      .text {
        display: inline-block;
        border-radius: 10px;
        padding: 5px 10px;
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

