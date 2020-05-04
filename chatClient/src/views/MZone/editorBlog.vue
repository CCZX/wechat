<template>
  <div class="editor-blog">
    <div class="header">
      <el-input v-model="blogParams.title" />
      <el-button class="publish-btn" @click="publish" type="primary">发表博客</el-button>
    </div>
    <div class="editor-area">
      <mavon-editor v-model="blogParams.content" class="container"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Editor',
  data() {
    return {
      blogParams: {
        category: [],
        tags: [],
        cover: '',
        title: '',
        content: '',
        desc: ''
      }
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    setBlogParams() {
      for (const key in this.blogParams) {
        if (this.blogParams.hasOwnProperty(key)) {
          this.blogParams[key] = ''
        }
      }
    },
    async publish() {
      const params = Object.assign({}, this.blogParams, {authorId: this.userInfo._id})
      const { data } = await this.$http.publishBlog(params)
      this.setBlogParams()
      if (data.status === 2000) {
        this.$confirm('恭喜你，发布成功！', '提示', {
          confirmButtonText: '回到列表',
          cancelButtonText: '再写一篇',
          type: 'warning'
        }).then(() => {
          this.$router.go(-1)
        }).catch(() => {
               
        })
      }
    }
  },
}
</script>

<style lang="scss">
.editor-blog {
  height: 100%;
  padding: 10px;
  .header {
    display: flex;
    margin-bottom: 10px;
    .publish-btn {
      margin-left: 10px;
    }
  }
  .editor-area {
    height: calc(100% - 50px);
    .v-note-wrapper.shadow {
      height: 100%;
    }
  }
}
</style>
