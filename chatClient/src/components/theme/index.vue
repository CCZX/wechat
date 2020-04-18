<template>
  <div class="theme-choose-cmp all0">
    <div class="theme-choose-cmp-container hor-ver-center">
      <header class="header">
        <i class="p-r-t el-icon-close" @click="setShowTheme(false)" />
      </header>
      <div class="theme-list">
        <div class="theme-item">
          <p class="title">透明度（{{opacity}}）</p>
          <el-slider :step="0.1" v-model="opacity" :max="1" @change="opacityChange"></el-slider>
        </div>
        <div class="theme-item">
          <p class="title">毛玻璃效果模糊度（{{blur}}）</p>
          <el-slider v-model="blur" :max="100" @change="blurChange"></el-slider>
        </div>
        <div class="theme-item">
          <p class="title">背景图片（尽量选择小于0.5M长方形的图片）</p>
          <el-radio-group v-model="bgImg" size="small" @change="bgImgChange">
            <el-radio label="abstract" border>抽象</el-radio>
            <el-radio label="city" border>城市</el-radio>
            <el-radio label="ocean" border>海岸</el-radio>
            <el-radio label="custom" border>
              <span>自定义</span>
            </el-radio>
          </el-radio-group>
          <div v-if="bgImg === 'custom'">
            <input type="file" name="customImg" id="customImg" @change="customBgImg">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { localImgToBase64 } from '@/utils'
export default {
  data() {
    return {
      opacity: 0,
      blur: 0,
      bgImg: ''
    }
  },
  methods: {
    setShowTheme(flag) {
      this.$emit('setShowTheme', flag)
    },
    opacityChange(e) {
      this.$store.dispatch('theme/SET_OPACITY', e)
    },
    blurChange(e) {
      this.$store.dispatch('theme/SET_BLUR', e)
    },
    bgImgChange(e) {
      if (e === 'custom' || e === 'customImg') return
      this.$store.dispatch('theme/SET_BG_IMG', e)
    },
    customBgImg(e) {
      localImgToBase64(e.target).then(res => {
        console.log(res)
        this.$store.dispatch('theme/SET_BG_IMG', res)
      }).catch(err => {
        this.$message.error(err)
      })
    }
  },
  mounted() {
    const { opacity, blur, bgImg } = this.$store.state.theme
    this.opacity = parseFloat(opacity)
    this.blur = parseInt(blur)
    this.bgImg = (bgImg || '').includes('base64') ? "custom" : bgImg
  },
}
</script>

<style lang="scss">
.theme-choose-cmp {
  position: fixed;
  background-color: rgba(0, 0, 0, .3);
  .theme-choose-cmp-container {
    width: 450px;
    height: 427px;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    .theme-list {
      margin-top: 5px;
      .theme-item {
        margin-top: 15px;
        .title {
          margin: 0 0 5px 0;
        }
        .el-radio-group {
          margin-top: 15px;
          .el-radio {
            margin-right: 5px;
          }
        }
        &:first-child {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
