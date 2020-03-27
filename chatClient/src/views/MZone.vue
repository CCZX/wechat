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
            :src="IMG_URL + userInfo.photo"
            @error="() => true"
          >
            <img
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            >
          </el-avatar>
          <span class="nickname">{{userInfo.nickname}}</span>
        </div>
      </div>
      <!-- <suck-top :top="60" parent="document" :z-index="1004" width="1020"> -->
        <div class="mzone-nav">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">好友动态</el-menu-item>
            <el-menu-item index="3">我的空间</el-menu-item>
            <el-menu-item index="4">我的档案</el-menu-item>
          </el-menu>
        </div>
      <!-- </suck-top> -->
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
          <send-mzone @watchsend="watchSendPyq" />
          <m-pyq
            :pyq-list-data="myFriendPyqList"
            :has-more="hasMorePyq"
            @modifyPyq="modifyPyq"
            @getPyq="getMyFriendPyq"
          />
        </div>
      </div>
      <back-top target=".mzone-page" />
    </div>
  </div>
</template>

<script>
import mPyq from '@/components/mzonePyq'
import sendMzone from '@/components/sendMZone'
import backTop from '@/components/backTop'
import suckTop from '@/components/suckTop'
export default {
  name: 'MZone',
  data() {
    return {
      IMG_URL: process.env.IMG_URL,
      activeIndex: '1',

      newPyqItem: {}, // 用户新发表的朋友圈
      myFriendPyqList: [], // 我的好友的朋友圈李彪
      hasMorePyq: true,
      pyqLoading: true, // 正在获取朋友圈
      pyqPage: 0,
      pyqPageSize: 7
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    watchSendPyq(newPyqItem) { // 监听用户发表新的朋友圈
      this.myFriendPyqList = [newPyqItem, ...this.myFriendPyqList]
    },
    getMyFriendPyq() { // 获取我的好友发表的朋友圈
      this.pyqLoading = true
      const params = {
        id: this.userInfo._id,
        page: this.pyqPage,
        pageSize: this.pyqPageSize
      }
      this.$http.getFriendlyPyq(params).then(res => {
        const { data, status } = res.data
        if (status === 2000 && res.status < 400) {
          this.myFriendPyqList = [...this.myFriendPyqList, ...data]
          this.pyqLoading = false
          if (data.length < 7) {
            this.hasMorePyq = false
          } else {
            this.hasMorePyq = true
            this.pyqPage++
          }
        }
      })
    },
    modifyPyq(newPyqList) {
      this.myFriendPyqList = newPyqList
    }
  },
  components: {
    mPyq,
    sendMzone,
    backTop,
    suckTop
  }
}
</script>

<style lang="scss" scoped>
.mzone-page {
  width: 100%;
  background-color: #e9ebee;
  height: 100%;
  overflow-y: scroll;
  .mzone-wrapper {
    height: 100%;
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
      // justify-content: space-between;
      margin-top: 10px;
      .menulist {
        width: 20%;
      }
      .content {
        width: 70%;
      }
    }
  }
}
</style>
