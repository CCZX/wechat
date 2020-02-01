<template>
  <div class="custom-search-list-com">
    <div class="wrapper" v-for="item in searchlist" :key="item._id">
      <div class="details">
        <el-avatar
          class="avatar"
          shape="square"
          :src="item.isGroup ? IMG_URL + item.img : IMG_URL + item.photo"
        >
        </el-avatar>
        <div class="info">
          <p class="item primary-font nickname">
            <span v-if="item.isGroup">
              {{item.title}}
            </span>
            <router-link :to="`/user/${item._id}`" tag="span" v-else>
              {{item.nickname}}
            </router-link>
          </p>
          <p class="item secondary-font">{{ item.isGroup ? item.desc : item.signature}}</p>
        </div>
      </div>
      <div class="operation">
        <el-button type="primary" size="small" icon="el-icon-plus">添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["searchlist"],
  data() {
    return {
      IMG_URL: process.env.IMG_URL
    }
  },
}
</script>

<style lang="scss">
.custom-search-list-com {
  
  .wrapper {
    border-top: 1px solid #C0C4CC;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    &:last-child {
      border-bottom: 1px solid #C0C4CC;
    }
    .details {
      display: flex;
      align-items: center;
      .avatar {
        width: 100px;
        height: 100px;
      }
      .info {
        margin-left: 27px;
        .item {
          font-family: "Helvetica, Arial, sans-serif";
          margin: 0;
          &:last-child {
            margin-top: 5px;
          }
        }
        .nickname {
          cursor: pointer;
          color: hsla(230, 84%, 63%, 1);
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
