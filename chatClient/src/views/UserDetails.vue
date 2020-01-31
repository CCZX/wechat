<template>
  <div class="user-details-page">
    <div class="wrapper">
      <div class="details-top">
        <div class="carousel">
          <el-carousel indicator-position="none" height="315px">
            <el-carousel-item v-for="(item, index) in userDetails.cover" :key="index">
              <img :src="IMG_URL + item" alt="" class="carousel-img">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="info">
          <el-avatar
            class="avatar"
            size="large"
            :src="IMG_URL + avatar"
            @error="() => true"
          >
            <img
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            >
          </el-avatar>
          <span class="nickname">{{userDetails.nickname}}</span>
          <el-button type="primary">不是好友加好友！</el-button>
        </div>
      </div>
      <div class="details-body">
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> 我的行程</span>
            我的行程 <br>
            我的行程 <br>
            我的行程 <br>
            我的行程 <br>
            我的行程 <br>
            我的行程 <br>
            我的行程 <br>
            我的行程 <br>
            我的行程 <br>
            我的行程 <br>
            我的行程 <br>
            我的行程 <br>我的行程 <br>
            我的行程 <br>
            我的行程 <br>
            我的行程 <br>
            我的行程 <br>
            我的行程 <br>
            我的行程 <br>
            我的行程 <br>
            我的行程 <br>
            我的行程 <br>
            我的行程 <br>
            我的行程 <br>
            我的行程 <br>
          </el-tab-pane>
          <el-tab-pane label="消息中心">消息中心</el-tab-pane>
          <el-tab-pane label="角色管理">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserDetails',
  data() {
    return {
      avatar: '',
      userDetails: {},
      IMG_URL: process.env.IMG_URL
    }
  },
  async created() {
    const { id } = this.$route.params
    const { data } = await this.$http.getUserInfo(id)
    const { data: userDetails, status } = data
    if (status === 2000) {
      this.avatar = userDetails.photo
      this.userDetails = userDetails
    }
  },
}
</script>

<style lang="scss">
.user-details-page {
  width: 100%;
  background-color: #e9ebee;
  min-height: 100%;
  .wrapper {
    width: 850px;
    margin: 0 auto;
    .details-top {
      height: 315px;
      position: relative;
      margin-bottom: 10px;
      .carousel {
        .carousel-img {
          width: 100%;
        }
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
    .details-body {
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
  }
}
</style>
