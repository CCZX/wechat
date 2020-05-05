<template>
  <div class="blog-meta-dialog-cmp all0">
    <div class="dialog-content hor-ver-center">
      <i class="el-icon-close p-r-t" @click="setShow(false)"></i>
      <div class="meta-list">
        <div class="meta-item">
          <part-title text="文章描述" />
          <el-input placeholder="请输入文章描述" type="textarea" v-model="blogDesc" />
        </div>
        <div class="meta-item cover">
          <part-title text="文章封面" />
          <div class="img-content" v-show="blogCover">
            <i class="el-icon-close" title="删除封面" @click="setCover('')"></i>
            <img class="img" :src="blogCover" alt="">          
          </div>
          <div class="upload-cover" v-show="!blogCover">
            <uploadImg useType="slot" :getStatus="getCover" :token="qiniuToken">
              <template slot-scope="slotProps">
                <el-button type="primary" icon="el-icon-upload" @click="slotProps.trigger">上传博客封面</el-button>
              </template>
            </uploadImg>
          </div>
        </div>
        <div class="meta-item cate-tag">
          <part-title text="文章分类及标签" />
          <div class="category item">
            <span
              :class="currentCate._id === item._id ? 'cate-item isactive' : 'cate-item'"
              v-for="item in categoryList"
              :key="item._id"
              @click="setCurrentCate(item)"
            >
              {{ item.name }}
            </span>
          </div>
          <div class="tag item">
            <span
              :class="selectedTags.includes(item.name) ? 'tag-item isselected' : 'tag-item'"
              v-for="item in tagList"
              :key="item._id"
              @click="selectTag(item)"
            >
              <el-tag
                type="success"
                :effect="selectedTags.includes(item.name) ? 'dark' : 'plain'"
              >{{item.name}}</el-tag>
            </span>
          </div>
          <div class="tag item">
            已选标签：
            <span
              class="tag-item"
              v-for="item in selectedTags"
              :key="item"
            >
              <el-tag size="small" closable @close="selectTag(item)">{{item.name}}</el-tag>
            </span>
          </div>
        </div>
      </div>
      <div class="footer">
        <el-button type="text" @click="setShow(false)">取消</el-button>
        <el-button type="info">存为草稿</el-button>
        <el-button type="primary" @click="publish">发表博客</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import partTitle from '@/components/partTitle'
import uploadImg from '@/components/customUploadImg'
import { qiniu_URL } from '@/const'
export default {
  data() {
    return {
      qiniuToken: '',
      categoryList: [],
      currentCate: {},
      tagList: [],
      selectedTags: [],
      blogDesc: '',
      blogCover: ''
    }
  },
  methods: {
    async getBlogCategory() {
      const { data } = await this.$http.getBlogCategory()
      if (data.status === 2000) {
        this.categoryList = data.data
        this.currentCate = this.categoryList[0]
        this.$emit('change', 'category', this.currentCate)
        this.getBlogTag()
      }
    },
    async getBlogTag() {
      const { data } = await this.$http.getBlogTag(this.currentCate._id)
      if (data.status === 2000) {
        this.tagList = data.data
      }
    },
    setCurrentCate(cate) {
      this.currentCate = cate
      this.$emit('change', 'category', this.currentCate)
      this.getBlogTag()
    },
    selectTag(tagItem) {
      // const name = item
      const selectedTags = this.selectedTags || []
      const index = selectedTags.findIndex(item => item._id === tagItem._id)
      if (index !== -1) {
        selectedTags.splice(index, 1)
      } else {
        selectedTags.push(tagItem)
      }
      this.$emit('change', 'tags', this.selectedTags)
    },
    setCover(cover) {
      this.blogCover = cover
      this.$emit('change', 'cover', this.blogCover)
    },
    getCover(res) {
      console.log(res)
      if (res.status === 'complete') {
        const cover = qiniu_URL + res.data.key
        this.setCover(cover)
      }
    },
    setShow(flag) {
      this.$emit('setShow', flag)
    },
    publish() {
      this.$emit('publish')
    }
  },
  watch: {
    blogDesc(desc) {
      this.$emit('change', 'desc', this.blogDesc)
    }
  },
  components: {
    partTitle,
    uploadImg
  },
  mounted() {
    this.getBlogCategory()
    this.$http.getQiniuToken().then(res => {
      const { data } = res
      this.qiniuToken = data.data
    })
  },
}
</script>

<style lang="scss">
@import './../../../static/css/var.scss';
.blog-meta-dialog-cmp {
  position: fixed;
  z-index: 2104;
  background-color: rgba(0, 0, 0, .4);
  .dialog-content {
    width: 600px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    .meta-list {
      .meta-item {
        margin-top: 10px;
        &:first-child {
          margin-top: 0;
        }
      }
      .cate-tag {
        .item {
          margin-top: 10px;
        }
        .category {
          color: $normalfont;
          .cate-item {
            margin-left: 10px;
            cursor: pointer;
            &:first-child {
              margin-left: 0;
            }
            &.isactive {
              color: $primarycolor;
            }
          }
        }
        .tag {
          .tag-item {
            display: inline-block;
            margin: 0 10px 10px 0;
            cursor: pointer;
          }
        }
      }
      .cover {
        .img-content {
          position: relative;
          width: 300px;
          height: 200px;
          .img {
            width: 100%;
            height: 100%;
          }
          .el-icon-close {
            position: absolute;
            top: 0;
            right: 0;
            background-color: rgba(0, 0, 0, .4);
            color: #fff;
            cursor: pointer;
          }
        }
      }
    }
    .footer {
      margin-top: 20px;
      text-align: right;
    }
  }
}
</style>
