<template>
  <div class="setting-panel-cmp">
    <div class="operation-list">
      <span
        class="item operation-text"
        @click="showFenzu"
        v-if="currentConversation.conversationType === conversationTypes.friend"
      >切换分组</span>
      <span
        class="item operation-text__danger"
        v-if="currentConversation.conversationType === conversationTypes.friend"
      >删除好友</span>
      <span
        class="item operation-text__danger"
        v-if="currentConversation.conversationType === conversationTypes.group"
      >退出群聊</span>
    </div>
    <fenzu-modal
      v-if="isShowFenzu"
      :current-conversation="currentConversation"
      @hidden-fenzu="hiddenFenzu"
    />
  </div>
</template>

<script>
import fenzuModal from '@/components/fenzuModal'
import { conversationTypes } from '@/const'
export default {
  props: ['currentConversation'],
  data() {
    return {
      isShowFenzu: false,
      conversationTypes
    }
  },
  methods: {
    showFenzu() {
      this.isShowFenzu = true
    },
    hiddenFenzu() {
      console.log(2)
      this.isShowFenzu = false
    }
  },
  components: {
    fenzuModal
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

