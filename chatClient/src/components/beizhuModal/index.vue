<template>
  <div class="beizhu-modal-cmp all0">
    <div class="beizhu hor-ver-center" v-loading="confirmLoading">
      <span class="p-r-t el-icon-close" @click="close"></span>
      <div class="header">
        <span class="title">修改备注姓名</span>
      </div>
      <div class="body">
        <el-input v-model="beizhu" />
      </div>
      <div class="footer">
        <el-button @click="ok" size="mini" type="success">确认</el-button>
        <el-button @click="close" size="mini" type="danger">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['currentConversation'],
  data() {
    return {
      confirmLoading: false,
      beizhu: this.currentConversation.beizhu
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    async ok() {
      this.confirmLoading = true
      const params = {
        userId: this.userInfo._id,
        friendId: this.currentConversation._id,
        friendBeizhu: this.beizhu
      }
      await this.$http.modifyFriendBeizhu(params)
      const userInfo = await this.$http.getUserInfo(this.userInfo._id)
      this.$store.dispatch('user/LOGIN', userInfo.data.data)
      this.$eventBus.$emit('toggleBeizhuModal', {
        show: false,
        data: {}
      })
      this.confirmLoading = false
    },
    close() {
      this.$eventBus.$emit('toggleBeizhuModal', {
        show: false,
        data: {
          currentConversation: {}
        }
      })
    }
  },
}
</script>

<style lang="scss">
.beizhu-modal-cmp {
  position: fixed;
  z-index: 1006;
  background-color: rgba(0, 0, 0, .2);
  .beizhu {
    width: 300px;
    padding: 10px 20px;
    background-color: #fff;
    border-radius: 10px;
    .body {
      margin: 10px 0;
    }
  }
}
</style>
