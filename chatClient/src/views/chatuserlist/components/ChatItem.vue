<template>
  <div class="chat-user-list-user__item"  @click="$router.push('/main/user/'+userinfo._id)">
    <div class="wrapper">
      <div class="user-info">
        <div class="avatar" :style="'background-image:url(http://localhost:3333' + userinfo.photo + ')'"></div>
        <div class="user-detail">
          <span class="primary-font detail-item">{{userinfo.nickname}}</span>
          <span class="ellipsis secondary-font detail-item">{{userinfo.signature}}</span>
        </div>
      </div>
      <div class="enter">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userinfo: {
      type: Object,
      default: {
        createDate: "",
        nickname: "",
        photo: "",
        signature: "",
        id: "",
        roomid: ""
      }
    }
  }
}
</script>

<style lang="scss">
.chat-user-list-user__item {
  @import "./../../../../static/css/var.scss";
  // border: 1px solid red;
  // height: 80px;
  cursor: pointer;
  .wrapper {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .user-info {
      display: flex;
      align-items: center;
      .avatar {
        box-sizing: border-box;
        margin-right: 20px;
        width: 50px;
        height: 50px;
        border: 1px solid $border1;
        border-radius: 50%;
        background-color: #ffffff;
        background-size: contain;
      }
      .user-detail {
        width: 200px;
        .detail-item {
          margin-top: 2px;
          display: block;
        }
      }
    }
    .enter {
      font-size: 30px;
    }
  }
}
</style>

