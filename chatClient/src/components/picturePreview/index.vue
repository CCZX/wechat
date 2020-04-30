<template>
  <div class="picture-preview-com all0">
    <div class="img-wrapper hor-ver-center" v-if="!error">
      <img
        v-show="!imgIsLoding"
        alt="图片地址"
        class="img-content"
        @error="handlerError"
        :src="img_url"
        :style="`transform:scale(${scale}) rotateZ(${rotate}deg)`"
        @load="load"
      >
      <div v-if="imgIsLoding" style="width: 400px" class="img-loading-tips"></div>
    </div>
    <div class="operation-list" v-if="showOper">
      <span
        class="oper-item close"
        title="关闭"
      />
      <span
        class="oper-item el-icon-plus plus"
        title="放大"
        @click.stop="plus"
      />
      <span
        class="oper-item el-icon-minus minus"
        title="缩小"
        @click.stop="minus"
      />
      <span
        class="oper-item el-icon-refresh-left spin"
        title="逆时针旋转90°"
        @click.stop="spin('left')"
      />
      <span
        class="oper-item el-icon-refresh-right spin"
        title="顺时针旋转90°"
        @click.stop="spin('right')"        
      />
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
      <span class="oper-item count">
        <span>{{currImgIndex}}</span> / <span>{{imgList.length ? imgList.length : 1}}</span>
      </span>
    </div>
    <div class="count" v-if="showOper">
      <span>{{currImgIndex}}</span> / <span>{{imgList.length ? imgList.length : 1}}</span>
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
    },
    showOper: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      error: false,
      img_url: '',
      currImgIndex: 0,
      scale: 1, // 图片放大缩小的值 
      rotate: 0,
      imgIsLoding: true
    }
  },
  methods: {
    load() {
      this.imgIsLoding = false
    },
    handlerClick() {
      this.$emit('setshow', false)
    },
    handlerError() {
      this.error = true
    },
    /**放大图片 */
    plus() {
      this.scale += 0.2
    },
    /**缩小图片 */
    minus() {
      this.scale -= 0.2
    },
    /**旋转图片 */
    spin(falg) {
      if (falg === 'left') {
        this.rotate -= 90
      } else if (falg === 'right') {
        this.rotate += 90
      }
    },
    previous() {
      const currIndex = this.imgList.findIndex(item => item === this.img_url)
      const len = this.imgList.length
      if (currIndex === 0 || currIndex === -1) {
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
    this.currImgIndex = currImgIndex === -1 ? 1 : currImgIndex + 1
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
  background-color: rgba(0, 0, 0, 0.4);
  .img-wrapper {
    display: inline-block;
    width: 80%;
    // height: 80%;
    cursor: zoom-out;
    .img-content {
      width: 100%;
    }
  }
  .operation-list {
    position: absolute;
    width: 100%;
    bottom: 3px;
    user-select: none;
    text-align: center;
    .oper-item {
      color: #fff;
      padding: 7px;
      background-color: #000;
      border-radius: 50%;
      cursor: pointer;
      &.close {
        position: fixed;
        right: 0;
        top: 0;
        border-radius: 0 0 0 40px;
        &::before {
          content: "❌";
          padding: 0 0 5px 5px;
        }
      }
      &.count {
        position: absolute;
        right: 0;
      }
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
