<template>
  <div class="conversation-item-menu box-shadow1">
    <span class="menu-item operation-text" v-if="type === 'recent'" @click.stop="remove">关闭会话</span>
    <span class="menu-item operation-text" @click.stop="viewProfile">查看资料</span>
    <span class="menu-item operation-text" @click.stop="modifyBeizhu">修改备注</span>
    <span class="menu-item operation-text" @click.stop="switchFenzu">切换分组</span>
    <el-popover
      placement="top"
      width="160"
      v-model="showDelPop">
      <p>删除好友后聊天记录等信息也会被删除，是否删除？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="showDelPop = false">取消</el-button>
        <el-button type="primary" size="mini" @click.stop="deleteFriend">确定</el-button>
      </div>
      <span slot="reference" class="menu-item operation-text" @click.stop="()=>{}">删除好友</span>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: ['conversation', 'type'],
  data() {
    return {
      showDelPop: false
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
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
    },
    async deleteFriend() {
      const {data} = await this.$http.deleteFriend({
        userM: this.userInfo._id,
        userY: this.conversation._id
      })
      if (data.status === 2000) {
        this.remove()
        this.$store.dispatch('app/SET_ALL_FRIENDS', {
          resource: this.conversation._id,
          type: 'delete'
        })
        this.$message({
          message: '删除成功！',
          type: 'success'
        })
      }
      console.log(data)
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
  }
  >.menu-item {
    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
