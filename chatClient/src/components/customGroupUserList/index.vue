<template>
  <div class="custom-group-user-list-com">
    <header class="header">
      <span class="title">群成员({{userlist.length}})</span>
    </header>
    <div class="user-item" v-for="item in userlist" :key="item._id">
      <div class="wrapper">
        <el-avatar
          class="avatar"
          size="large"
          :src="'http://localhost:3333' + item.userId.photo"
          @error="() => true"
        >
          <img
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          >
        </el-avatar>
        <div class="user-detail">
          <span class="primary-font detail-item ">{{item.userId.nickname}}</span>
          <!-- <span class="ellipsis secondary-font detail-item">{{item.userId.signature}}</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroupUserListComponent",
  props: {
    userlist: Array
  },
};
</script>

<style lang="scss">
.custom-group-user-list-com {
  height: 100%;
  padding: 5px;
  overflow-y: scroll;
  .header {
    border-bottom: 1px solid #cccccc;
  }
  .user-item {
    height: 30px;
    margin-top: 4px;
    .wrapper {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .avatar {
        width: 30px;
        height: 30px;
      }
      .user-detail {
        width: 70%;
      }
    }
  }
}
</style>

