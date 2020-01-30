<template>
  <div class="chat-area__message-list__com" ref="msglist" :key="Date.now()">
    <div class="tips" ref="tips" :key="Date.now()">
      <span>没有更多消息了</span>
    </div>
    <transition-group appear name="slipOut">
      <message-item v-for="(item, index) in messagelist" :key="index" :messageitem="item"/>
    </transition-group>
    <div class="flag"></div>
  </div>
</template>

<script>
import messageItem from "./MessageItem"
export default {
  props: ["messagelist"],
  components: {
    messageItem
  },
  watch: {
    messagelist: {
      handler() {
        this.$nextTick(() =>{
          setTimeout(() => {
            this.$refs['msglist'].scrollTop = this.$refs['msglist'].scrollHeight + 200
            setTimeout(() => {
              this.$refs['tips'].style.opacity = "1"
            }, 100);
          }, 0);
        })
      },
      deep: true,
      immediate: true
    }
  },
};
</script>

<style lang="scss">
.chat-area__message-list__com {
  .tips {
    opacity: 0;
    text-align: center;
  }
  box-sizing: border-box;
  height: 100%;
  overflow-y: scroll;
  padding: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
  .slipOut-enter {
    opacity: 0;
    transform: translateY(300px);
  }

  .slipOut-leave-to {
    opacity: 0;
  }

  .slipOut-enter-active,
  .slipOut-leave-active {
    transition: all 0.6s ease;
  }
  // .slipOut-enter-active:nth-child(5n + 2) {
  //   transition-delay: 0.3s;
  // }
  // .slipOut-enter-active:nth-child(5n + 3) {
  //   transition-delay: 0.5s;
  // }
  // .slipOut-enter-active:nth-child(5n + 4) {
  //   transition-delay: 0.7s;
  // }
  // .slipOut-enter-active:nth-child(5n + 5) {
  //   transition-delay: 0.9s;
  // }
}
</style>

