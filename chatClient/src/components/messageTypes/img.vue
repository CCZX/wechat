<template>
  <div class="message-type__img">
    <img height="200" style="cursor: zoom-in" :src="message.message" alt="图片加载失败" @click="setshowPicturePreview(true)">
    <div v-if="message.uploading" class="all0 img-cover">图片上传中...</div>
    <transition name="fade">
      <picture-preview
        v-if="showPicturePreview"
        :current-img="message.message"
        :img-list="imgUrlList"
        @setshow="setshowPicturePreview"
      />
    </transition>
  </div>
</template>

<script>
import './../../../static/iconfont/iconfont.css'
import './../../../static/css/animation.scss'
import picturePreview from '@/components/picturePreview'
export default {
  props: ['message', 'imgTypeMsgList'],
  data() {
    return {
      showPicturePreview: false
    }
  },
  computed: {
    imgUrlList() {
      return (this.imgTypeMsgList || []).map(item => item.message)
    }
  },
  methods: {
    setshowPicturePreview(flag) {
      this.showPicturePreview = flag
    }
  },
  components: {
    picturePreview
  }
}
</script>

<style lang="scss">
.message-type__img {
  position: relative;
  img {
    background-color: #f2f2f2;
  }
  .img-cover {
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .2);
    color: #fff;
  }
}
</style>
