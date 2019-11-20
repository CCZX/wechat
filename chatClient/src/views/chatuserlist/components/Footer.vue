<template>
  <div class="chat-user-list__footer">
    <el-footer>
      <router-link to="/main/chat/friend" tag="span" class="switch-item">
        <i class="icon el-icon-chat-dot-square"></i>
        <span class="icon-text">好友</span>
      </router-link>
      <router-link to="/main/chat/group" tag="span" class="switch-item">
        <i class="icon el-icon-user"></i>
        <span class="icon-text">群聊</span>
      </router-link>
      <router-link :to='"/main/user/"+userInfo._id' tag="span" class="switch-item">
        <i class="icon el-icon-user"></i>
        <span class="icon-text">我</span>
      </router-link>
    </el-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  // computed: {
  //   userInfo() {
  //     return JSON.parse(this.$store.state.user.userInfo)
  //   }
  // },
  created() {
    this.userInfo = JSON.parse(this.$store.state.user.userInfo)
  },
}
</script>

<style lang="scss">
.chat-user-list__footer {
  @import './../../../../static/css/var.scss';
  .el-footer {
    // background-color: #B3C0D1;
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #909399;
    color: #333;
    text-align: center;
    background-color: $seatfont;
    // line-height: 60px;
    .switch-item {
      display: flex;
      flex-direction: column;
      text-align: center;
      color: $primaryfont;
      .icon {
        font-size: 30px;
      }
      // .icon-text {
      //   font-size: 20px;
      //   color: $primaryfont;
      // }
      &.router-link-active {
        color: $primarycolor;
      }
    }
  }
}  
</style>

