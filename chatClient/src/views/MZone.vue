<template>
  <div class="mzone-page">
    <div class="mzone-wrapper">
      <div class="mzone-top">
        <div class="carousel" :style="'backgroundImage:url(' + IMG_URL + userInfo.cover [0] + ')'">
          
        </div>
        <div class="info">
          <el-avatar
            class="avatar"
            size="large"
            :src="userDetails.avatar"
            @error="() => true"
          >
            <img
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            >
          </el-avatar>
          <span class="nickname">{{userDetails.nickname}}</span>
        </div>
      </div>
      <div class="mzone-nav">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">好友动态</el-menu-item>
          <el-menu-item index="3">我的档案</el-menu-item>
          <el-menu-item index="4">不知带</el-menu-item>
        </el-menu>
      </div>
      <div class="mzone-body">
        <div class="menulist">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
          >
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="content">
          <send-mzone />
          <m-pyq />
        </div>
        <div class="slider">
          slider
        </div>
      </div>
      <back-top />
    </div>
  </div>
</template>

<script>
import mPyq from '@/components/mzonePyq'
import sendMzone from '@/components/sendMZone'
import backTop from '@/components/backTop'
export default {
  name: 'MZone',
  data() {
    return {
      userDetails: {},
      IMG_URL: process.env.IMG_URL,
      activeIndex: '1'
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  async created() {
    const { _id: id } = this.$store.state.user.userInfo
    const { data } = await this.$http.getUserInfo(id)
    const { data: userDetails, status } = data
    if (status === 2000) {
      userDetails.avatar = this.IMG_URL + userDetails.photo
      this.userDetails = userDetails
    }
  },
  components: {
    mPyq,
    sendMzone,
    backTop
  }
}
</script>

<style lang="scss">
.mzone-page {
  width: 100%;
  background-color: #e9ebee;
  min-height: 100%;
  .mzone-wrapper {
    width: 1020px;
    margin: 0 auto;
    .mzone-top {
      height: 190px;
      position: relative;
      margin-bottom: 10px;
      .carousel {
        height: 190px;
        background-size: cover;
        background-repeat: no-repeat;
      }
      .info {
        display: flex;
        align-items: center;
        position: absolute;
        bottom: -10px;
        z-index: 999;
        padding: 0 10px;
        // height: 60px;
        .avatar {
          width: 100px;
          height: 100px;
        }
        .nickname {
          margin: 0 30px;
          font-size: 27px;
          color: #ffffff;
        }
      }
    }
    .mzone-nav {
      .el-tabs {
        box-shadow: none;
        background-color: #e9ebee;
        .el-tabs__header {
          .is-active {
            position: relative;
            border-bottom: none;
            &::before {
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              transition: all .5s ease;
              content: '';
              width: 0;
              height: 0;
              border-bottom: 10px solid #e9ebee;
              border-left: 10px solid transparent;
              border-right: 10px solid transparent;
            }
          }
        }
        .el-tabs__content {
          margin-top: 10px;
          background: #FFF
        }
      }
    }
    .mzone-body {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      .menulist {
        width: 18%;
      }
      .content {
        width: 60%;
      }
      .slider {
        width: 18%;
        border: 1px solid red;
      }
    }
  }
}
</style>
