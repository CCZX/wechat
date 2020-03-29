<template>
  <div class="layout-cmp__aside">
    <div class="avatar">
      <router-link to="/index">
        <el-avatar shape="square" :size="50" :src="IMG_URL + userInfo.photo"></el-avatar>
      </router-link>
      <el-tooltip class="item" effect="dark" :content="userInfo.nickname" placement="top">
        <el-button>上边</el-button><span class="nickname">{{userInfo.nickname}}</span>
      </el-tooltip>
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
      <oper-menu />
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
  .avatar {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .nickname {
      display: inline-block;
      width: 50px;
      margin-top: 10px;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
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
