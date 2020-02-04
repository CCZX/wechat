<template>
  <div class="picture-preview-com">
    <el-image :src="imgurl">
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
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
  methods: {
    handerClick() {
      this.$emit('setshow', false)
    }
  },
  created() {
    document.addEventListener('click', this.handerClick)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handerClick)
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
  .el-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    .image-slot {
      height: 500px;
      text-align: center;
      line-height: 500px;
      font-size: 50px;
      background-color: #f5f7fa;
      color: #909399;
    }
  }
}
</style>
