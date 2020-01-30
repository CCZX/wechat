<template>
  <div class="chat-area__header">
    <transition name="roll">
      <div class="wrapper" v-if="currentConversation.roomid">
        <span>{{currentConversation.isGroup ? currentConversation.groupId.title : currentConversation.nickname}}</span>
        <i class="icon-qun iconfont iconic iconic-group" v-if="currentConversation.conversationType === 'GROUP'"></i>
        <i class="el-icon-user-solid iconic " v-else></i>
      </div>
    </transition>
  </div>
</template>

<script>
import './../../../../static/iconfont/iconfont.css'
export default {
  props: {
    currentConversation: Object
  }
}
</script>

<style lang="scss">
.chat-area__header {
  box-sizing: border-box;
  height: 60px;
  padding: 0 10px;
  // background-color: rgba(0, 0, 0, .3);
  line-height: 60px;
  border-bottom: 1px solid #cccccc;
  .iconic-group::before {
    font-size: 20px;
  }
  .roll-enter {
    opacity: 0;
    transform: translateY(30px);
  }

  .roll-leave-to {
    opacity: 0;
    transform: translateY(-30px)
  }

  .roll-enter-active,
  .roll-leave-active {
    transition: all 0.6s ease;
  }
}
</style>

