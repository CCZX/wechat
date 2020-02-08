<template>
  <div class="send-mzone-com">
    <div class="header">
      <div class="send-content">
        <textarea
          class="send-textarea"
          v-model="content"
          maxlength="200"
          placeholder="说点什么吧"
          @focus="showFotter = true"
        ></textarea> 
      </div>
      <span class="camera">
        <i class="camera-icon iconfont icon-xiangji"></i>  
      </span>     
    </div>
    <transition name="roll">
      <div class="footer" v-if="showFotter">
        <div class="poster-attach">
          <i class="item iconfont icon-emoji" @click.stop="handlerShowEmoji"></i>
          <i :style="pictures.length >= 2 ? {'cursor': 'not-allowed'}: {}" class="item el-icon-picture" @click.stop="handleShowUplodImg"></i>
        </div>
        <div class="poster-sync">
          仅好友可见
        </div>
        <div class="send">
          <el-button type="success" size="small" @click="send">发表</el-button>
        </div>
        <transition name="roll">
          <div class="emoji-com" v-show="showEmoji">
            <custom-emoji @addemoji="addEmoji" />
          </div>
        </transition>
        <transition name="roll">
          <div class="emoji-com" v-show="showUploadImg">
            <upload-img @addemoji="addEmoji" :token="token" :getstatus="getPictureStatus" />
          </div>
        </transition>
      </div>
    </transition>
    <transition name="roll">
      <div class="picture-view-area" v-show="pictures.length">
        <picture-view :size="pictureLimit" :pitures="pictures" @deleteItem="deletePictureItem" />
      </div>
    </transition>
    
  </div>
</template>

<script>
const PICTURE_LIMIT = 2
import customEmoji from '@/components/customEmoji'
import uploadImg from '@/components/customUploadImg'
import pictureView from '@/components/customPictureView'
import { fromatTime } from '@/utils'
import { uploadImgStatusMap, qiniu_URL } from '@/const'
export default {
  data() {
    return {
      content: '',
      pictures: [],
      showFotter: false,
      showEmoji: false,
      showUploadImg: false,
      pictureLimit: PICTURE_LIMIT,
      token: ''
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    async send() {
      if (!this.content) {
        this.$message.error('说点什么吧？')
        return
      }
      const data = {
        userId: this.userInfo._id,
        content: this.content,
        createDate: fromatTime(new Date()),
        pictures: this.pictures
      }
      const res = await this.$http.publishPyqNews(data)
      console.log(res)
    },
    getPictureStatus(res) {
      if (res.status === uploadImgStatusMap.error) {
        this.$message.error('图片上传失败！')
        return
      }
      if (res.status === uploadImgStatusMap.complete) {
        const IMG_URL = qiniu_URL + res.data.key
        this.pictures = [...this.pictures, IMG_URL]
      }
    },
    deletePictureItem(index) {
      this.pictures.splice(index, 1)
    },
    addEmoji(item) {
      this.content += item
    },
    handlerShowEmoji() {
      this.showEmoji = !this.showEmoji
      this.showUploadImg = false
    },
    handleShowUplodImg() {
      if (this.pictures.length >= 2) {
        this.$message({
          message: `最多只能上传${this.pictureLimit}张图片哟~`,
          type: 'warning'
        });
      } else {
        this.showUploadImg = !this.showUploadImg
      }
      this.showEmoji = false
    },
    documentHandlerClick() {
      this.showEmoji = false
      this.showUploadImg = false
    }
  },
  components: {
    customEmoji,
    uploadImg,
    pictureView
  },
  created() {
    document.addEventListener('click', this.documentHandlerClick)
    this.$http.getQiniuToken().then(res => {
      const { data } = res
      this.token = data.data
    })
  },
}
</script>

<style lang="scss">
@import './../../../static/css/animation.scss';
.send-mzone-com {
  position: relative;
  background-color: #fff;
  margin-bottom: 10px;
  .header {
    display: flex;
    border-bottom: 1px solid #C0C4CC;
    align-items: center;
    height: 60px;
    .send-content {
      flex-grow: 1;
      .send-textarea {
        display: inline-block;
        height: 60px;
        box-sizing: border-box;
        height: calc(100% - 30px);
        width: 100%;
        outline: none;
        border: none;
        border: 0;
        border-radius: 5px;
        padding: 0px 10px;
        resize: none;
      }
    }
    .camera {
      display: inline-block;
      width: 50px;
      height: 100%;
      background-color: #c35673;
      text-align: center;
      line-height: 60px;
      .camera-icon {
        font-size: 20px;
        color: #fff;
      }
    }
  }
  .footer {
    position: relative;
    padding: 7px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all .5s ease;
    .poster-attach {
      .item {
        // cursor: not-allowed;
        margin-right: 10px;
        font-size: 20px;
        color: #c35673;
      }
    }
  }
  .picture-view-area {
    padding: 10px;
  }
  .emoji-com {
    width: 100px;
    position: absolute;
    top: 100%;
    z-index: 1002;
  }
}
</style>

