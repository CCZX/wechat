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
            <span>
              <!-- <router-link :to="`/user/${item.authorId._id}`" class="user-content-link">
                {{item.authorId.nickname}}  
              </router-link> -->
              <el-popover
                placement="top"
                width="240"
                trigger="hover"
              >
                <div class="user-card-body">
                  <div class="header">
                    <div class="user-card-avatar">
                      <el-avatar :size="50" :src="IMG_URL + item.authorId.photo" @error="()=>true">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                      </el-avatar>
                    </div>
                    <div class="user-card-info">
                      <p class="info-item-nickname ellipsis">{{item.authorId.nickname}}</p>
                      <p class="info-item-signature ellipsis secondary-font">{{item.authorId.signature}}</p>
                    </div>
                  </div>
                  <!-- <div class="content">
                    <el-button type="success" size="mini">加好友</el-button>
                  </div> -->
                </div>
                <router-link slot="reference" :to="`/user/${item.authorId._id}`" class="user-content-link">
                  {{item.authorId.nickname}}  
                </router-link>
              </el-popover> 
            </span>：
            <span>{{item.content}}</span>
          </p>
          <p class="time-content secondary-font">{{item.createDate | formatDate}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDateToZH } from '@/utils'
export default {
  props: ["commentlist"],
  data() {
    return {
      IMG_URL: process.env.IMG_URL
    }
  },
  filters: {
    formatDate(val) {
      return formatDateToZH(val)
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
          .user-content-link {
            text-decoration: none;
          }
        }
        .time-content {
          margin: 5px 0 0 0;
        }
      }
    }
  }
}
</style>

