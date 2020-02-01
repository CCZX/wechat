<template>
  <div class="layout-header__com">
    <el-header>
      <div class="logo">
        WeChats
        <span class="logo-img"></span>
      </div>
      <div class="operation">
        <span class="item">
          <router-link to="/add" tag="span">
            加好友 <i class="el-icon-plus"></i>
          </router-link>
        </span>
        <span class="item">
          <router-link to="/add" tag="span">
            发动态 <i class="el-icon-plus"></i>
          </router-link>
        </span>
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
    background-color: #3578E5;
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
    .operation {
      display: flex;
      align-items: center;
      .item {
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        border-radius: 10px;
        padding: 0 7px;
        &:hover {
          background-color: #4267B2;
        }
        &:hover {
          color: #2f2f2f;
        }
      }
    }
    .user-info {
      display: flex;
      align-items: center;
      .name-sigin {
        display: flex;
        flex-direction: column;
        line-height: 20px;
        margin-left: 10px;
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

