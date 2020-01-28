<template>
  <div
    :class="currentConverssation._id === userinfo._id ? 'useritem__com active' : 'useritem__com'"
  >
    <div class="user-info">
      <div class="wrapper">
        <el-avatar size="large" :src="'http://localhost:3333' + userinfo.photo" @error="() => true">
          <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt srcset>
        </el-avatar>
        <div class="user-detail">
          <span class="primary-font detail-item">{{userinfo.nickname}}</span>
          <span class="ellipsis secondary-font detail-item">{{userinfo.signature}}</span>
        </div>
      </div>
    </div>
    <!-- <div class="enter">
      <i class="el-icon-arrow-right"></i>
    </div>-->
  </div>
</template>

<script>
export default {
  props: {
    userinfo: {
      type: Object,
      default() {
        return {
          createDate: "",
          nickname: "",
          photo: "",
          signature: "",
          id: "",
          roomid: ""
        };
      }
    },
    currentConverssation: {
      type: Object,
      default() {
        return {
          createDate: "",
          nickname: "",
          photo: "",
          signature: "",
          id: "",
          roomid: ""
        };
      }
    }
  },
  methods: {
    avatarErr() {
      return true;
    }
  },
};
</script>

<style lang="scss">
.useritem__com {
  @import "./../../../static/css/var.scss";
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &.active {
    .wrapper {
      background-color: rgba(0, 0, 0, 0.1);
      transition: all .5s ease-in;
    }
  }
  .user-info {
    width: 100%;
    height: 60px;
    padding: 0 10px;
    .wrapper {
      display: flex;
      height: 60px;
      padding: 0 5px;
      align-items: center;
      border-radius: 10px;
      .user-detail {
        flex-grow: 1;
        margin-left: 10px;
        .detail-item {
          margin-top: 2px;
          display: block;
        }
      }
    }
  }
  .enter {
    font-size: 30px;
  }
}
</style>

