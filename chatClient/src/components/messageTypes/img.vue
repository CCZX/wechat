<template>
  <div class="message-type__img">
    <img width="200" style="cursor: zoom-in" :src="message.message" alt="" @click="setshowPicturePreview(true)">
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
