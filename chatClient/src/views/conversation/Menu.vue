<template>
  <div class="conversation-item-menu box-shadow1">
    <span class="menu-item operation-text" v-if="type === 'recent'" @click.stop="remove">关闭会话</span>
    <span class="menu-item operation-text" @click.stop="viewProfile">查看资料</span>
    <span class="menu-item operation-text" @click.stop="modifyBeizhu">修改备注</span>
    <span class="menu-item operation-text" @click.stop="switchFenzu">切换分组</span>
  </div>
</template>

<script>
export default {
  props: ['conversation', 'type'],
  methods: {
    remove() {
      this.$emit('hiddenMenu')
      this.$emit('remove')
    },
    viewProfile() {
      this.$http.getUserInfo(this.conversation._id).then(res => {
        console.log(res)
      })
      // this.$eventBus.$emit('showUserProfile')
    },
    switchFenzu() {
      this.$eventBus.$emit('toggleFenzuModal', {
        show: true,
        data: {
          currentConversation: this.conversation
        }
      })
      this.$emit('hiddenMenu')
    },
    modifyBeizhu() {
      this.$eventBus.$emit('toggleBeizhuModal', {
        show: true,
        data: {
          currentConversation: this.conversation
        }
      })
      this.$emit('hiddenMenu')
    }
  },
}
</script>

<style lang="scss">
.conversation-item-menu {
  padding: 5px;
  .menu-item {
    display: block;
    margin-top: 10px;
    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
