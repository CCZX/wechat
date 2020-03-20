<template>
  <div class="message-type__text">
    <span @contextmenu.stop="showMenu">{{message.message}}</span>
  </div>
</template>

<script>
import './../../../static/iconfont/iconfont.css'
export default {
  props: ['message'],
  methods: {
    showMenu(e) {
      e.preventDefault()
      this.$eventBus.$emit('toggleMsgTextMenu', {
        show: true,
        data: this.message,
        left: e.clientX+5,
        top: e.clientY+5
      })
    }
  },
}
</script>
