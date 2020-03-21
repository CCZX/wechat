<template>
  <div class="layout-cmp__aside">
    <div class="avatar">
      <el-avatar shape="square" :size="50" :src="IMG_URL + userInfo.photo"></el-avatar>
    </div>
    <div class="nav-list">
      <router-link to="/add" tag="span" title="加好友">
        <span class="nav-item iconfont icon-icon-"></span>
      </router-link>
      <router-link to="/mzone" tag="span" title="空间">
        <span class="nav-item iconfont icon-icon-test1"></span>
      </router-link>
      <span class="nav-item iconfont icon-zhongchuangkongjian-"></span>
    </div>
    <div class="operation">
      <el-dropdown placement="left">
        <span class="el-dropdown-link">
          <i class="oper-item el-icon-s-operation"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import operMenu from './operMenu'
export default {
  data() {
    return {
      IMG_URL: process.env.IMG_URL
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  components: {
    operMenu
  }
}
</script>

<style lang="scss">
@import './../../../../static/iconfont/iconfont.css';
.layout-cmp__aside {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px 0;
  .nav-list {
    margin-top: 30px;
    .nav-item {
      display: block;
      margin-top: 20px;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .operation {
    position: absolute;
    bottom: 30px;
    .oper-item {
      font-size: 30px;
    }
  }
}
</style>
