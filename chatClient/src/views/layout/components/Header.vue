<template>
  <div class="layout-header__com">
    <el-header>
      <div class="logo">
        WeChats
        <span class="logo-img"></span>
      </div>
      <div class="user-info">
        <el-avatar size="large"
          :src="'http://localhost:3333' + userInfo.photo"
          @error="() => true"
        >
          <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="" srcset="">
        </el-avatar>
        <div class="name-sigin">
          <span class="name">{{userInfo.nickname}}</span>
          <span class="sigin">{{userInfo.signature}}</span>
        </div>
      </div>
    </el-header>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.userInfo = this.$store.state.user.userInfo
  },
}
</script>


<style lang="scss">
.layout-header__com {
  @import "./../../../../static/css/var.scss";
  .el-header {
    display: flex;
    justify-content: space-between;
    background-color: $primarycolor;
    color: $normalwhite;
    line-height: 60px;
    .logo {
      position: relative;
      // width: 10%;
      cursor: pointer;
      font-size: 20px;
      .logo-img {
        position: absolute;
        top: 0;
        left: 100%;
        width: 60px;
        height: 60px;
        background-image: url('./../../../../static/image/logo.jpg');
        background-size: contain;
      }
    }
    .user-info {
      display: flex;
      align-items: center;
      .avatar {
        box-sizing: border-box;
        margin-right: 20px;
        width: 50px;
        height: 50px;
        border: 1px solid $border1;
        border-radius: 50%;
        background-color: #ffffff;
        background-size: contain;
        // background-color: red;
      }
      .name-sigin {
        display: flex;
        flex-direction: column;
        line-height: 20px;
        .name {
          font-size: 20px;
        }
        .sigin {
          font-size: 12px;
        }
      }
    }
  }
}
</style>

