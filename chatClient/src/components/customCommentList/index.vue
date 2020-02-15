<template>
  <div class="custom-comment-list-com">
    <div class="comment-list-wrapper">
      <div class="comment-item" v-for="item in commentlist" :key="item._id">
        <div class="avatar">
          <el-avatar :size="40" :src="IMG_URL + item.authorId.photo" @error="()=>true">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
          </el-avatar>
        </div>
        <div class="content">
          <p class="user-content ellipsis">
            <span>{{item.authorId.nickname}}</span>：
            <span>{{item.content}}</span>
          </p>
          <p class="time-content secondary-font">{{item.createDate | formatDate}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils'
export default {
  props: ["commentlist"],
  data() {
    return {
      IMG_URL: process.env.IMG_URL
    }
  },
  filters: {
    formatDate(val) {
      return formatDate(new Date(val), 'YYYY-MM-DD HH-MM-SS')
    }
  }
}
</script>

<style lang="scss">
.custom-comment-list-com {
  .comment-list-wrapper {
    .comment-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
      .content {
        margin-left: 10px;
        flex: 1;
        .user-content {
          margin: 0;
        }
        .time-content {
          margin: 5px 0 0 0;
        }
      }
    }
  }
}
</style>

