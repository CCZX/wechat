<template>
  <div class="send-mzone-com">
    <div class="header">
      <div class="send-content">
        <textarea
          class="send-textarea"
          v-model="content"
          maxlength="200"
          placeholder="说点什么吧~"
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
          <el-button type="success" size="small" @click="send" :loading="isPublishing">发表</el-button>
          <el-button type="danger" size="small" @click="cancel">取消</el-button>
        </div>
        <transition name="roll">
          <div class="emoji-com" v-show="showEmoji">
            <custom-emoji @addemoji="addEmoji" />
          </div>
        </transition>
        <transition name="roll">
          <div class="emoji-com" v-show="showUploadImg">
            <upload-img 
              :token="token"
              :getStatus="getPictureStatus"
              :getLocalUrl="getPicLocalUrl"
            />
          </div>
        </transition>
      </div>
    </transition>
    <transition name="roll">
      <div class="picture-view-area" v-show="pictures.length">
        <picture-view :size="pictureLimit" :pitures="pictures" @deleteItem="deletePictureItem" @deleteAll="deletePictures" />
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
      // pictures: ['http://blog.static.chenr.cn/cc-messger-170240566a4-56.jpeg', 'http://blog.static.chenr.cn/cc-messger-1701041742e-71.jpeg', 'http://blog.static.chenr.cn/cc-messger-170240566a4-56.jpeg'],
      // pictures: [{url: '', guid: '', uploading: true, uploadPercent: 10}, ...],
      pictures: [],
      showFotter: false,
      showEmoji: false,
      showUploadImg: false,
      pictureLimit: PICTURE_LIMIT,
      token: '',
      isPublishing: false
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
      this.isPublishing = true
      const data = {
        userId: this.userInfo._id,
        content: this.content,
        createDate: fromatTime(new Date()),
        pictures: this.pictures
      }
      const res = await this.$http.publishPyqNews(data)
      const { status } = res.data
      if (status === 2000 && res.status < 400) {
        this.$message({
          message: '发布成功！',
          type: 'success'
        })
        console.log(res.data.data[0])
        this.$emit('watchsend', {
          ...res.data.data[0],
          userId: {
            _id: this.userInfo._id,
            photo: this.userInfo.photo,
            signature: this.userInfo.signature,
            nickname: this.userInfo.nickname
          },
          comments: [],
          likes: []
        })
        this.content = ""
        this.pictures = []
        this.showFotter = false
      }
      this.isPublishing = false
    },
    getPicLocalUrl(url, guid) {
      console.log('getPicLocalUrl')
      this.pictures = [...this.pictures, {url, guid, uploading: true}]
    },
    getPictureStatus(res) {
      console.log(res)
      if (res.status === uploadImgStatusMap.error) {
        this.$message.error('图片上传失败！')
        return
      }
      if (res.status === uploadImgStatusMap.next) {
        const guid = res.guid
        const percent = Number(Number((res.data && res.data.total && res.data.total.percent) || 0).toFixed(2))
        const pictures = JSON.parse(JSON.stringify(this.pictures)) || []
        pictures.forEach(item => {
          if (item.guid === guid) {
            item.uploadPercent = percent
          }
        })
        this.pictures = pictures
      }
      if (res.status === uploadImgStatusMap.complete) {
        const IMG_URL = qiniu_URL + res.data.key
        const guid = res.guid
        const pictures = this.pictures || []
        pictures.forEach(item => {
          if (item.guid === guid) {
            item.url = IMG_URL
            delete item.uploading
            delete item.uploadPercent
          }
        })
        this.pictures = pictures
      }
    },
    cancel() {
      this.showFotter = false
      this.content = ''
      this.pictures = []
    },
    deletePictureItem(index) {
      this.pictures.splice(index, 1)
    },
    deletePictures() {
      this.pictures = []
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
      height: 100%;
      .send-textarea {
        display: inline-block;
        height: 100%;
        box-sizing: border-box;
        width: 100%;
        outline: none;
        border: none;
        padding: 10px;
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
        cursor: pointer;
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

