// 用户卡片组件
<template>
  <div class="user-card-cmp">
    <div class="header">
      <div class="user-card-avatar">
        <el-avatar :size="50" :src="IMG_URL + userDetails.photo" @error="()=>true">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
        </el-avatar>
      </div>
      <div class="user-card-info">
        <p class="info-item-nickname ellipsis">{{userDetails.nickname}}</p>
        <p class="info-item-signature ellipsis secondary-font">{{userDetails.signature}}</p>
      </div>
    </div>
    <!-- <div class="content">
      <el-button type="success" size="mini">加好友</el-button>
    </div> -->
  </div>
</template>

<script>
export default {
  props: ["userDetails"],
  data() {
    return {
      IMG_URL: process.env.IMG_URL
    }
  },
}
</script>

<style lang="scss">
.user-card-cmp {
  .header {
    display: flex;
    align-items: center;
    .user-card-info {
      width: 144px;
      margin-left: 10px;
      .info-item-nickname {
        margin: 0;
      }
      .info-item-signature {
        margin: 3px 0;
      }
    }
  }
}
</style>

