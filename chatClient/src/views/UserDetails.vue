<template>
  <div class="user-details-page">
    <div class="wrapper">
      <div :class="device === 'Mobile' ? 'details-top mobile' : 'details-top'">
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
      <div class="details-body">
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> TA的动态</span>
            <pyq-list-cmp
              :pyq-list-data="pyqList"
              :has-more="hasMorePyq"
              @getPyq="getUserPyq"
            />
          </el-tab-pane>
          <el-tab-pane label="消息中心">
            <span slot="label"><i class="el-icon-date"></i> TA的资料</span>
          </el-tab-pane>
          <el-tab-pane label="角色管理">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import pyqListCmp from '@/components/mzonePyq'
export default {
  name: 'UserDetails',
  data() {
    return {
      userDetails: {},
      IMG_URL: process.env.IMG_URL,

      pyqList: [],
      hasMorePyq: true,
      pyqPage: 0,
      pyqPageSize: 7
    }
  },
  computed: {
    device() {
      return this.$store.state.device.deviceType
    }
  },
  methods: {
    getUserPyq() {
      const { id } = this.$route.params
      const params = {userId: id, page: this.pyqPage, pageSize: this.pyqPageSize}
      this.$http.getUserPyq(params).then(res => {
        const { data, status } = res.data
        if (status === 2000 && res.status < 400) {
          this.pyqList = [...this.pyqList, ...data]
          this.pyqLoading = false
          if (data.length < 7) {
            this.hasMorePyq = false
          } else {
            this.hasMorePyq = true
            this.pyqPage++
          }
        }
      })
    }
  },
  components: {
    pyqListCmp
  },
  async created() {
    const { id } = this.$route.params
    // this.getUserPyq()
    const { data } = await this.$http.getUserInfo(id)
    const { data: userDetails, status } = data
    if (status === 2000) {
      userDetails.avatar = this.IMG_URL + userDetails.photo
      this.userDetails = userDetails
    }
  },
}
</script>

<style lang="scss">
.user-details-page {
  width: 100%;
  // background-color: #e9ebee;
  height: 100%;
  overflow: scroll;
  .wrapper {
    width: 100%;
    margin: 0 auto;
    .details-top {
      height: 315px;
      position: relative;
      margin-bottom: 10px;
      &.mobile {
        height: 200px;
      }
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
      .el-tabs--border-card {
        background-color: #e9ebee;
      }
      .el-tabs {
        box-shadow: none;
        // background-color: #e9ebee;
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
          // background: #FFF
        }
      }
    }
  }
}
</style>
