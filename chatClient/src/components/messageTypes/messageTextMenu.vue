<template>
  <div class="message-text__menu box-shadow1" :style="{'top': top + 'px', 'left': left + 'px'}">
    <span class="menu-item operation-text" @mousedown="copy" v-copy="message.message">复制</span>
    <span class="menu-item operation-text">收藏</span>
    <span class="menu-item operation-text">删除</span>
    <span class="menu-item operation-text">加入代办</span>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object
    },
    top: {
      type: Number
    },
    left: {
      type: Number
    }
  },
  methods: {
    copy() {
      console.log('copy copy')
    },
    handlerHiddhen(e) {
      if (e.target.classList.contains('menu-item')) {
        setTimeout(() => {
          this.$eventBus.$emit('toggleMsgTextMenu', {
            show: false,
            data: {},
            left: 0,
            top: 0
          })
        }, 500)  
      } else {
        this.$eventBus.$emit('toggleMsgTextMenu', {
          show: false,
          data: {},
          left: 0,
          top: 0
        })
      }
    }
  },
  mounted() {
    window.addEventListener('mousedown', this.handlerHiddhen)
  },
  beforeDestroy() {
    window.removeEventListener('mousedown', this.handlerHiddhen)
  },
}
</script>

<style lang="scss">
.message-text__menu {
  position: fixed;
  z-index: 2003;
  background-color: #fff;
  padding: 0 5px 5px 5px;
  .menu-item {
    display: block;
    margin-top: 5px;
  }
}
</style>

