<template>
  <div
    class="chat-area__message-item__com"
    :style="messageitem.senderId === userInfo._id ? {'flex-direction': 'row-reverse', 'margin-left': 'calc(100% - 200px)'} : ''">
    <el-avatar
      class="avatar"
      size="large"
      :src="messageitem.senderId === userInfo._id ? 'http://localhost:3333' + userInfo.photo : 'http://localhost:3333' + messageitem.senderAvatar"
      @error="() => true"
    >
      <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt srcset>
    </el-avatar>
    <div class="message-info">
      <span class="secondary-font time">{{messageitem.time}}</span>
      <div
        class="content"
        :style="messageitem.senderId === userInfo._id ? {'background-color': 'hsla(149, 78%, 53%, 1)'} : {}"
      >
        <span class="primary-font">{{messageitem.message}}</span>
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
  }
};
</script>

<style lang="scss">
.chat-area__message-item__com {
  display: flex;
  position: relative;
  width: 200px;
  justify-content: space-between;
  margin-bottom: 10px;
  .avatar {
    margin-top: 10px;
    // position: absolute;
  }
  .message-info {
    width: 150px;
    .content {
      margin-top: 50px;
      position: relative;
      margin: 5px 0 0 0;
      white-space: wrap;
      word-break: break-word;
      background-color: hsla(201, 100%, 55%, 1);
      padding: 5px;
      border-radius: 10px;
      flex-grow: 0;
      // width: 30px;
      &::before {
        content: "";
        display: inline-block;
        position: absolute;
        border: 10px solid red;
        right: 100%;
        z-index: 99999;
      }
    }
  }
}
</style>

