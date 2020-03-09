<template>
  <div class="conversation-item-menu box-shadow1">
    <span class="menu-item operation-text" @click.stop="remove">关闭会话</span>
    <span class="menu-item operation-text">查看资料</span>
    <span class="menu-item operation-text">修改备注</span>
    <span class="menu-item operation-text">切换分组</span>
  </div>
</template>

<script>
export default {
  methods: {
    remove() {
      console.log('remove')
      this.$emit('remove')
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
