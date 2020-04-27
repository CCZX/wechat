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
    <div class="about-list">
      <a href="https://github.com/CCZX/wechat" target="_blank" title="github">
        <svg t="1586172201730" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2278" width="20" height="20"><path d="M0 524.992q0 166.016 95.488 298.496t247.488 185.504q6.016 0.992 10.016 0.992t6.496-1.504 4-3.008 2.016-4.992 0.512-4.992v-100.512q-36.992 4-66.016-0.512t-45.504-14.016-28.992-23.488-16.992-25.504-8.992-24-5.504-14.496q-8.992-15.008-27.008-27.488t-27.008-20-2.016-14.496q50.016-26.016 112.992 66.016 34.016 51.008 119.008 30.016 10.016-40.992 40-70.016Q293.984 736 237.984 670.976t-56-158.016q0-87.008 55.008-151.008-22.016-64.992 6.016-136.992 28.992-2.016 64.992 11.488t50.496 23.008 25.504 17.504q56.992-16 128.512-16t129.504 16q12.992-8.992 28.992-19.008t48.992-21.504 60.992-9.504q27.008 71.008 7.008 135.008 56 64 56 151.008 0 92.992-56.992 158.496t-172 85.504q43.008 43.008 43.008 104v128.992q0 0.992 0.992 3.008 0 6.016 0.512 8.992t4.512 6.016 12 3.008q152.992-52 250.496-185.504t97.504-300.512q0-104-40.512-199.008t-108.992-163.488-163.488-108.992T512.032 12.96 313.024 53.472 149.536 162.464t-108.992 163.488-40.512 199.008z" p-id="2279"></path></svg>
      </a>
    </div>
    <div class="operation">
      <oper-menu @setShowTheme="setShowTheme" />
    </div>
  </div>
</template>

<script>
import operMenu from './operMenu'
export default {
  props: {
    setShowTheme: {
      type: Function
    }
  },
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
  background-color: var(--primary-bgcolor-7);
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
      color: var(--primary-color-10);
      margin-top: 20px;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .about-list {
    margin-top: 150px;
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
