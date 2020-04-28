<template>
  <div class="history-msg-item-cmp">
    <div class="history-msg-item__header">
      <span class="name normal-font">{{name}}</span>
      <span class="time secondary-font">{{msgItem.time | formatDateToZH}}</span>
    </div>
    <div class="history-msg-item__content primary-font">
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
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    },
    friendBeizhu() { // 好友备注Map {id2: '备注1', id1: '备注2'}
      return this.userInfo.friendBeizhu || {}
    },
    name() {
      const msg = this.msgItem
      const friendBeizhu = this.friendBeizhu
      let res = ''
      if (msg.senderId === this.userInfo._id) {
        res = '我'
      } else {
        res = friendBeizhu[msg.senderId] ? friendBeizhu[msg.senderId] : msg.senderNickname
      }
      return res
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
    word-break: break-word;
  }
}
</style>
