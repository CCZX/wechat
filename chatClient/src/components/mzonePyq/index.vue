<template>
  <div class="pyq-com">
    <div class="pyq-com-wrapper">
      <div class="item" v-for="item in pyqList" :key="item._id+Date.now()">
        <div class="header">
          <router-link :to="`/user/${item.userId._id}`">
            <el-avatar :size="60" :src="IMG_URL + item.userId.photo" @error="()=>true">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
            </el-avatar>
          </router-link>
          <div class="info">
            <div class="nickname">
              <router-link :to="`/user/${item.userId._id}`" class="nickname-link">
                {{item.userId.nickname}}
              </router-link>
            </div>
            <div class="time secondary-font">
              <span>{{item.createDate}}</span>
            </div>
          </div>
        </div>
        <div class="body">
          <div class="content">
            <span>{{item.content}}</span>
          </div>
          <div class="pictures">
            <span class="picture-item" v-for="(imgSrc, index) in item.pictures" :key="index" @click="setCurrentImgUrl(imgSrc)">
              <img class="img" :src="imgSrc" alt="" srcset="">
            </span>
          </div>
        </div>
        <div class="info">
          <div class="read">
            <span class="secondary-font">阅读：{{item.readCount ? item.readCount : 0}}次</span>
          </div>
          <div class="operation">
            <i class="item iconfont icon-pinglun1 comment" title="评论"></i>
            <i class="item iconfont icon-dianzan like" title="点赞"></i>
            <i class="item iconfont icon-zhuanfa farward" title="转发"></i>
          </div>
        </div>
        <div class="comment-like">
          <div class="like iconfont icon-dianzan">
            <span>
              16-计科-四班-徐傲、15计科2班边小丰、计科 16 唐圣雄、16计科章格宁、16 计科 王志宏、张潇、曾泉文、谢必瑞、李阳、Stamina、最后一天、taco哥、情、说丶、、Shilling、.、林曜曜、SuMm Er.、。。等55人觉得很赞
            </span>
          </div>
        </div>
      </div>
      <div class="loading">
        <el-button v-if="isLoading" type="primary" style="width: 100%" :loading="isLoading">加载中</el-button>
      </div>
      <div style="margin-bottom: 10px">
        <el-alert v-if="!hasMore && !isLoading" title="没有更多了..." type="info" center show-icon :closable="false" />
      </div>
    </div>
    <transition>
      <picture-preview :imgurl="currentImgUrl" @setshow="setshowPicturePreview" v-if="showPicturePreview" />            
    </transition>
  </div>
</template>

<script>
import './../../../static/iconfont/iconfont.css'
import picturePreview from '@/components/picturePreview'
import { debounce } from '@/utils'
export default {
  data() {
    return {
      pyqList: [],
      IMG_URL: process.env.IMG_URL,
      page: 0,
      pageSize: 7,
      hasMore: true,
      isLoading: false,
      currentImgUrl: '',
      showPicturePreview: false
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    getFriendlyPyq() {
      this.isLoading = true
      const params = {
        id: this.userInfo._id,
        page: this.page,
        pageSize: this.pageSize
      }
      this.$http.getFriendlyPyq(params).then(res => {
        const { data, status } = res.data
        if (status === 2000 && res.status < 400) {
          this.pyqList = [...this.pyqList, ...data]
          this.isLoading = false
          if (data.length < 7) {
            this.hasMore = false
          } else {
            this.hasMore = true
            this.page++
          }
        }
      })
    },
    setCurrentImgUrl(url) {
      this.currentImgUrl = url
      this.showPicturePreview = true
    },
    setshowPicturePreview(flag) {
      this.showPicturePreview = flag
    },
    handleDocmentScroll: debounce(function () {
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight
      const scrollHeight = document.documentElement.scrollHeight
      if (scrollTop + clientHeight + 10 >= scrollHeight) {
        if (this.hasMore) {
          this.getFriendlyPyq() 
        }
      }
    }, 500)
  },
  components: {
    picturePreview
  },
  created() {
    this.getFriendlyPyq()
    document.addEventListener('scroll', this.handleDocmentScroll)
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.handleDocmentScroll)    
  },
}
</script>

<style lang="scss">
@import './../../../static/css/animation.scss';
.pyq-com {
  .pyq-com-wrapper {
    .item {
      background-color: #fff;
      padding: 10px;
      margin-bottom: 10px;
      .header {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #C0C4CC;
        padding: 0 0 10px;
        .info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-left: 10px;
          .nickname {
            .nickname-link {
              text-decoration: none;
              color: #222222;
              &:hover {
                text-decoration: underline;
                color: #409EFF;
              }
            }
          }
          .time {
            margin-top: 10px;
          }
        }
      }
      .body {
        padding: 10px 0;
        .content {
          margin-bottom: 8px;
          font-size: 18px;
        }
        .pictures {
          .picture-item {
            cursor: zoom-in;
            .img {
              width: 270px;
            }
          }
        }
      }
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .operation {
          .item {
            width: 40px;
            height: 40px;
            font-size: 20px;
            cursor: pointer;
          }
        }
      }
      .comment-like {
        position: relative;
        margin-top: 20px;
        padding: 10px;
        background-color: #e5e9ef;
        &::before {
          position: absolute;
          bottom: 100%;
          content: '';
          border-bottom: 10px solid #e5e9ef; // f4f5f7
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
        }
        .like {
          &::before {
            padding: 1px;
            color: #c35673;
          }
        }
      }
    }
  }
}
</style>


