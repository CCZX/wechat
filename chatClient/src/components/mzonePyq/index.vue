<template>
  <div class="pyq-com">
    <div class="pyq-com-wrapper">
      <div class="item" v-for="item in pyqList" :key="item._id">
        <div class="header">
          <el-avatar :size="60" :src="IMG_URL + item.userId.photo" @error="()=>true">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
          </el-avatar>
          <div class="info">
            <div class="nickname">
              <span>{{item.userId.nickname}}</span>
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
            <span class="picture-item" v-for="(imgSrc, index) in item.pictures" :key="index">
              <img class="img" :src="imgSrc" alt="" srcset="">
            </span>
            <span class="picture-item" v-for="(imgSrc, index) in item.pictures" :key="index">
              <img class="img" :src="imgSrc" alt="" srcset="">
            </span>
          </div>
        </div>
        <div class="info">
          <div class="read">
            <span class="secondary-font">阅读：{{item.readCount ? item.readCount : 0}}次</span>
          </div>
          <div class="operation">
            <i class="item iconfont icon-pinglun1 comment"></i>
            <i class="item iconfont icon-dianzan like"></i>
            <i class="item iconfont icon-zhuanfa farward"></i>
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
    </div>
  </div>
</template>

<script>
import './../../../static/iconfont/iconfont.css'
export default {
  data() {
    return {
      pyqList: [],
      IMG_URL: process.env.IMG_URL,
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  created() {
    this.$http.getFriendlyPyq(this.userInfo._id).then(res => {
      const { data, status } = res.data
      if (status === 2000 && res.status < 400) {
        this.pyqList = data
      }
    })
  },
}
</script>

<style lang="scss">
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
          .time {
            margin-top: 10px;
          }
        }
      }
      .body {
        padding: 10px 0;
        .content {
          margin-bottom: 8px;
          font-size: 20px;
        }
        .pictures {
          .picture-item {
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
          }
        }
      }
      .comment-like {
        padding: 10px 0;
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


