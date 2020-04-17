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
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      opacity: 0,
      blur: 0
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
    }
  },
  mounted() {
    const { opacity, blur } = this.$store.state.theme
    this.opacity = parseFloat(opacity)
    this.blur = parseInt(blur)
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
        &:first-child {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
