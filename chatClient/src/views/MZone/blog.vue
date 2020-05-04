<template>
  <div class="mzone-blog">
    <div class="entry-wrapper">
      <el-button class="el-icon-edit" type="primary">
        <router-link class="entry-link" to="/chat/editor">
          写博客
        </router-link>
      </el-button>
    </div>
    <div class="content">
      <ul class="blog-list">
        <li v-for="item in blogList" :key="item._id">
          <router-link class="entry-link" :to="`/chat/blog/${item._id}`">
            <div class="blog-item">
              <div class="meta-rows">
                <span class="meta-item">{{item.authorId.nickname}}</span>
                <span class="meta-item">{{item.createDate | formatDateToZH}}</span>
              </div>
              <div class="title">
                <router-link class="entry-link" :to="`/chat/blog/${item._id}`">
                  {{item.title}}
                </router-link>
              </div>
              <div class="action"></div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { formatDateToZH } from '@/utils'
export default {
  data() {
    return {
      blogList: []
    }
  },
  methods: {
    async getBlogList() {
      const { data } = await this.$http.getBlogList()
      if (data.status === 2000) {
        this.blogList = data.data
      }
    }
  },
  filters: {
    formatDateToZH(val) {
      return formatDateToZH(val)
    }
  },
  mounted() {
    this.getBlogList()
  },
}
</script>

<style lang="scss">
@import './../../../static/css/var.scss';
.mzone-blog {
  background-color: $primarybg;
  padding: 10px;
  .content {
    margin-top: 10px;
    .blog-list {
      .blog-item {
        padding: 10px;
        border-bottom: 1px solid #f2f2f2;
        &:first-child {
          border-top: 1px solid #f2f2f2;          
        }
        .meta-rows {
          display: flex;
          align-items: center;
          align-content: center;
          color: $secondaryfont;
          font-size: 12px;
          .meta-item {
            &::after {
              content: '·';
              margin: 0 4px;
            }
            &:last-child {
              &::after {
                display: none;
              }
            }
          }
        }
        .title {
          padding: 10px 0;
          font-size: 20px;
          color: $primaryfont;
          .entry-link {
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
</style>
