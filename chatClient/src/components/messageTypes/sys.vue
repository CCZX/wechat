<template>
  <div class="message-type__sys">
    <span class="secondary-font">{{message.message}}</span>
  </div>
</template>

<script>
import './../../../static/iconfont/iconfont.css'
export default {
  props: ['message']
}
</script>
