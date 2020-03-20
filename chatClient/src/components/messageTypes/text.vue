<template>
  <div class="message-type__text">
    <span>{{message.message}}</span>
  </div>
</template>

<script>
import './../../../static/iconfont/iconfont.css'
export default {
  props: ['message']
}
</script>
