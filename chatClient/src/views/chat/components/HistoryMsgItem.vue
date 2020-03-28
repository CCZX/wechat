<template>
  <div class="history-msg-item-cmp">
    <div class="history-msg-item__header">
      <span class="name">{{msgItem.senderNickname}}</span>
      <span class="time">{{msgItem.time | formatDateToZH}}</span>
    </div>
    <div class="history-msg-item__content">
      <img v-if="msgItem.messageType === 'img'" width="200" :src="msgItem.message" />
      <span v-else>{{msgItem.message}}</span>
    </div>
  </div>
</template>

<script>
import { formatDateToZH } from '@/utils'
export default {
  props: {
    msgItem: {
      type: Object
    }
  },
  filters: {
    formatDateToZH(val) {
      return formatDateToZH(val)
    }
  }
}
</script>

<style lang="scss">
.history-msg-item-cmp {
  padding: 5px 0;
  // border-bottom: 1px solid red;
  .history-msg-item__content {
    margin-top: 5px;
  }
}
</style>
