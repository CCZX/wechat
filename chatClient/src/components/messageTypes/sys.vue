<template>
  <div class="message-type__sys">
    <span class="secondary-font sys-text">{{message.message}}</span>
  </div>
</template>

<script>
import './../../../static/iconfont/iconfont.css'
export default {
  props: ['message']
}
</script>

<style lang="scss">
.message-type__sys {
  .sys-text {
    color: hsla(201, 100%, 55%, 1);
  }
}
</style>
