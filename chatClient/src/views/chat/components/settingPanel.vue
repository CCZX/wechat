<template>
  <div class="setting-panel-cmp">
    <div class="operation-list">
      <span
        class="item operation-text"
        @click.stop="showFenzu"
        v-if="currentConversation.conversationType === conversationTypes.friend"
      >切换分组</span>
      <span
        class="item operation-text"
        slot="reference"
        @click.stop="showBeizhu"
        v-if="currentConversation.conversationType === conversationTypes.friend"
      >修改备注</span>
      <span
        class="item operation-text__danger"
        v-if="currentConversation.conversationType === conversationTypes.friend"
      >删除好友</span>
      <span
        class="item operation-text__danger"
        v-if="currentConversation.conversationType === conversationTypes.group"
      >退出群聊</span>
    </div>
  </div>
</template>

<script>
import { conversationTypes } from '@/const'
export default {
  props: ['currentConversation'],
  data() {
    return {
      conversationTypes,
      newBeizhu: ''
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    showFenzu() {
      this.$eventBus.$emit('toggleFenzuModal', {
        show: true,
        data: {
          currentConversation: this.currentConversation
        }
      })
    },
    showBeizhu() {
      this.$eventBus.$emit('toggleBeizhuModal', {
        show: true,
        data: {
          currentConversation: this.currentConversation
        }
      })
    }
  }
}
</script>

<style lang="scss">
.setting-panel-cmp {
  padding-left: 20px;
  background-color: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  .operation-list {
    .item {
      line-height: 20px;
    }
  }
}
</style>

