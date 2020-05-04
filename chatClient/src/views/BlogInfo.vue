<template>
  <div class="blog-info-page" v-loading="isFetching">
    <div class="header">
      <avatar-header :userInfo="authorInfo" :time="blogInfo.createDate" />
    </div>
    <div class="blog-info">
      <p class="title">{{blogInfo.title}}</p>
      <div v-html="content" class="markdown-body"></div>
    </div>
    <div class="action-list">

    </div>
  </div>
</template>

<script>
import marked from '@/plugins/marked'
import { debounce, formatDateToZH } from '@/utils'
import avatarHeader from '@/components/avatarHeader'
export default {
  name: 'BlogInfo',
  data() {
    return {
      IMG_URL: process.env.IMG_URL,
      isFetching: true,
      id: '',
      blogInfo: {},
      authorInfo: {}
    }
  },
  computed: {
    content() {
      return marked(this.blogInfo.content, false, true).html
    }
  },
  methods: {
    setAuthorInfo(info) {
      for (const key in info) {
        if (info.hasOwnProperty(key)) {
          this.$set(this.authorInfo, key, info[key])
        }
      }
    },
    async getBlogInfo() {
      this.isFetching = true
      const { data } = await this.$http.getBlogInfo(this.id)
      if (data.status === 2000) {
        this.blogInfo = data.data
        this.setAuthorInfo(data.data.authorId)
      }
      this.isFetching = false
    }
  },
  filters: {
    formatDateToZH(val) {
      return formatDateToZH(val)
    }
  },
  components: {
    avatarHeader
  },
  created() {
    const id = this.$route.params.id
    this.id = id
    this.getBlogInfo()
  }
}
</script>

<style lang="scss">
@import './../../static/css/markdown.css';
.blog-info-page {
  position: relative;
  height: 100%;
  padding: 20px;
  overflow-x: hidden;
  .blog-info {
    margin-top: 30px;
    .title {
      margin: 0 0 30px;
      font-size: 30px;
    }
  }
  .action-list {
    position: absolute;
    bottom: 0;
    background-color: #fff;
    height: 20px;
    width: 100%;
  }
}
</style>
