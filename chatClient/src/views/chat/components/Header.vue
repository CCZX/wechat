<template>
  <div class="chat-area__header">
    <span>{{currentConverssation.nickname}}</span>
  </div>
</template>

<script>
export default {
  props: {
    currentConverssation: Object
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
}
</style>

