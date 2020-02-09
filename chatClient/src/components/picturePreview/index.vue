<template>
  <div class="picture-preview-com">
    <div class="img-wrapper hor-ver-center" v-if="!error">
      <img :src="imgurl" class="img-content" alt="图片" @error="handlerError">
    </div>
    <div class="img-error img-wrapper hor-ver-center" v-if="error">
      图片加载失败
    </div>
  </div>
</template>

<script>
export default {
  props: {
    'imgurl': {
      type: String,
      default: function () {
        return 'https://empty'
      }
    }
  },
  data() {
    return {
      error: false
    }
  },
  methods: {
    handlerClick() {
      this.$emit('setshow', false)
    },
    handlerError() {
      console.log('error')
      this.error = true
    }
  },
  created() {
    document.addEventListener('click', this.handlerClick)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handlerClick)
  },
}
</script>

<style lang="scss">
.picture-preview-com {
  position: fixed;
  z-index: 10001;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  .img-wrapper {
    display: inline-block;
    height: 88%;
    cursor: zoom-out;
    .img-content {
      max-height: 100%;
    }
  }
  .img-error {
    width: 500px;
    height: 300px;
    background-color: #f5f7fa;
    color: #909399;
    text-align: center;
    line-height: 300px;
  }
}
</style>
