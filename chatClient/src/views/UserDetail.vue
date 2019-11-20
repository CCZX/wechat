<template>
  <div class="user-detail-page">
    <el-header>
      <i @click="$router.go(-1)" class="el-icon-arrow-left" style="color: red;"></i>
    </el-header>
    <div class="block">
      <el-carousel trigger="click" height="200px">
        <el-carousel-item v-for="item in userInfo.cover" :key="item">
          <img class="wall-img-item" :src="'http://localhost:3333'+item">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="user-detail">
      <div class="avatar" :style="'background-image:url(' + avatarUrl + ')'"></div>
      <div class="user-info">
        <p class="ellipsis">ChatID:<span class="userinfo-value">{{userInfo.code}}</span></p>
        <p class="ellipsis">NickName:<span class="userinfo-value">{{userInfo.nickname}}</span></p>
      </div>
      <div class="other-info">
        <p>性别:<span class="userinfo-value">{{userInfo.sex | formatGender}}</span></p>
        <p>所在地:<span class="userinfo-value">{{userInfo.province && userInfo.province.name}}
          {{userInfo.city && userInfo.city.name}} {{userInfo.town && userInfo.town.name}}</span></p>
        <p>个性签名:<span class="userinfo-value">{{userInfo.signature}}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      _id: '',
      userInfo: {}
    }
  },
  computed: {
    avatarUrl() {
      return process.env.IMG_URL+this.userInfo.photo
    }
  },
  methods: {
  },
  filters: {
    formatGender(val) {
      if (val === "0") {
        return "男"
      } else if (val === "1") {
        return "女"
      } else {
        return "保密"
      }
    }
  },
  created() {
    this._id = this.$route.params.id
    this.$http.getUserInfo(this._id).then(res => {
      let { status, data } = res.data
      if (res.status === 200 && status === 2000) {
        this.$message.success("获取用户详情成功！")
        this.userInfo = data
      }
    })
  }
}
</script>

<style lang="scss">
.user-detail-page {
  @import './../../static/css/var.scss';
  position: relative;
  height: 100%;
  .el-header {
    position: absolute;
    width: 100%;
    z-index: 999;
    height: 40px !important;
    background-color: rgba(0, 0, 0, .1);
    line-height: 40px;
  }
  .block {
    position: absolute;
    top: 0;
    height: 200px;
    width: 100%;
    z-index: 990;
    .wall-img-item {
      width: 100%;
      height: 100%;
    }
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
  }
  .user-detail {
    // position: absolute;
    z-index: 999;
    margin-top: 200px;
    // height: 300px;
    color: $primaryfont;
    .avatar {
      position: absolute;
      z-index: 99999;
      width: 100px;
      height: 100px;
      top: 170px;
      left: 10px;
    }
    .userinfo-value {
      margin-left: 5px;
    }
    .user-info {
      margin-left: 120px;
    }
    .other-info {
      padding: 0 10px;
    }
  }
}
</style>

