<template>
  <div class="blog-info-page" v-loading="isFetching">
    <div class="blog-wrapper">
      <div class="blog-main">
        <div class="header">
          <avatar-header :userInfo="authorInfo" :time="blogInfo.createDate" />
        </div>
        <div class="cover" v-css="{'background-image': 'url(' + blogInfo.cover + ')'}"></div>
        <div class="blog-info">
          <p class="title">{{blogInfo.title}}</p>
          <div v-html="content" class="markdown-body"></div>
        </div>
      </div>
      <div class="blog-aside" :style="{top: pageScrollTop + 300 + 'px'}">
        <span class="like iconfont icon-dianzan"></span>
      </div>
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
      authorInfo: {},
      pageScrollTop: 0
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
    },
    handlerScroll: debounce(function (e) {
      this.pageScrollTop = e.target.scrollTop
    }, 500)
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
  },
  mounted() {
    document.querySelector('.blog-info-page').addEventListener('scroll', this.handlerScroll)
  },
}
</script>

<style lang="scss">
@import './../../static/css/animation.scss';
@import './../../static/css/markdown.css';
.blog-info-page {
  position: relative;
  height: 100%;
  padding: 20px;
  overflow-x: hidden;
  .blog-wrapper {
    margin-right: 30px;
    .blog-main {
      .cover {
        width: 100%;
        padding: 20%;
      }
      .blog-info {
        margin-top: 30px;
        .title {
          margin: 0 0 30px;
          font-size: 30px;
        }
      }
    }
    .blog-aside {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      position: absolute;
      right: 5px;
      width: 20px;
      transition: all .5s;
    }
  }
}
</style>
