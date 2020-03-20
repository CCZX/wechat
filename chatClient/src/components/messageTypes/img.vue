<template>
  <div class="message-type__img">
    <img width="200" style="cursor: zoom-in" :src="message.message" alt="" @click="setshowPicturePreview(true)">
    <transition name="fade">
      <picture-preview :imgurl="message.message" @setshow="setshowPicturePreview" v-if="showPicturePreview" />
    </transition>
  </div>
</template>

<script>
import './../../../static/iconfont/iconfont.css'
import './../../../static/css/animation.scss'
import picturePreview from '@/components/picturePreview'
export default {
  props: ['message'],
  data() {
    return {
      showPicturePreview: false
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
