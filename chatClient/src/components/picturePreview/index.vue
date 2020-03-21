<template>
  <div class="picture-preview-com all0">
    <div class="img-wrapper hor-ver-center" v-if="!error">
      <img :src="img_url" class="img-content" alt="图片" @error="handlerError">
    </div>
    <div class="operation">
      <span
        class="oper-item el-icon-arrow-left previous"
        title="上一张"
        @click.stop="previous"
      />
      <span
        class="oper-item el-icon-arrow-right next"
        title="下一张"
        @click.stop="next"
      />
    </div>
    <div class="count">
      <span>{{currImgIndex}}</span> / <span>{{this.imgList.length}}</span>
    </div>
    <div class="img-error img-wrapper hor-ver-center" v-if="error">
      图片加载失败
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentImg: {
      type: String,
      default: 'https://empty'
    },
    imgList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      error: false,
      img_url: '',
      currImgIndex: 0
    }
  },
  methods: {
    handlerClick() {
      this.$emit('setshow', false)
    },
    handlerError() {
      console.log('error')
      this.error = true
    },
    previous() {
      const currIndex = this.imgList.findIndex(item => item === this.img_url)
      const len = this.imgList.length
      if (currIndex === 0) {
        return this.$message({type: 'warning', message: '已经是第一张了~'})
      } else {
        this.img_url = this.imgList[currIndex - 1]
      }
      this.currImgIndex = currIndex
    },
    next() {
      const currIndex = this.imgList.findIndex(item => item === this.img_url)
      const len = this.imgList.length
      if (currIndex === len - 1) {
        return this.$message({type: 'warning', message: '已经是最后一张了~'})
      } else {
        this.img_url = this.imgList[currIndex + 1]
      }
      this.currImgIndex = currIndex + 2
    }
  },
  created() {
    document.addEventListener('click', this.handlerClick)
    const currImgIndex = (this.imgList || []).findIndex(item => item === this.currentImg)
    this.img_url = this.currentImg
    this.currImgIndex = currImgIndex + 1
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handlerClick)
  },
}
</script>

<style lang="scss">
.picture-preview-com {
  position: fixed;
  z-index: 1005;
  background-color: rgba(0, 0, 0, 0.2);
  .img-wrapper {
    display: inline-block;
    height: 88%;
    cursor: zoom-out;
    .img-content {
      max-height: 100%;
    }
  }
  .operation {
    .oper-item {
      position: absolute;
      transform: translateY(-50%);
      font-size: 30px;
      color: hsla(230, 11%, 19%, 1);
      padding: 7px;
      background-color: #fff;
      cursor: pointer;
    }
    .previous {
      left: 10px;
      top: 50%;
    }
    .next {
      right: 10px;
      top: 50%;
    }
  }
  .count {
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    padding: 5px;
    opacity: .5;
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
