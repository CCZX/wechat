<template>
  <div class="fenzu-menu box-shadow1" :style="{'top': top + 'px', 'left': left + 'px'}">
    <span class="menu-item operation-text" @click.stop="addFenzu">添加分组</span>
    <span class="menu-item operation-text" @click.stop="editFenzu">编辑分组</span>
    <el-popover
      placement="top"
      width="200"
      trigger="click"
      v-model="visible"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <p style="margin: 0 0 5px 0">删除后分组下的好友会自动添加到【我的好友】，确认删除？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="deleteFenzu">确定</el-button>
      </div>
      <span
        slot="reference"
        class="menu-item operation-text"
      >删除分组</span>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: ['top', 'left'],
  data() {
    return {
      visible: false
    }
  },
  methods: {
    addFenzu() {
      this.$emit('addFenzu')
      this.$emit('close')
    },
    deleteFenzu() {
      this.$emit('deleteFenzu')
      this.$emit('close')
      this.visible = false
    },
    editFenzu() {
      this.$emit('editFenzu')
      this.$emit('close')
    }
  },
}
</script>

<style lang="scss">
.fenzu-menu {
  position: fixed;
  padding: 0 10px 10px 10px;
  background-color: #fff;
  .menu-item {
    display: block;
    margin-top: 10px;
  }
}
</style>
