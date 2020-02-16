<template>
  <div class="back-top-com">
    <div class="back-top-com-wrapper" v-if="show" @click="goTop" title="Back Top">
      <i class="el-icon-arrow-up"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    goTop() {
      document.documentElement.scrollTop = 0
    },
    watchDocmentScroll() {
      const scrollTop = document.documentElement.scrollTop
      if (scrollTop > 2000) {
        this.show = true
      } else {
        this.show = false
      }
    }
  },
  mounted() {
    document.addEventListener('scroll', this.watchDocmentScroll)
    this.watchDocmentScroll()
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.watchDocmentScroll)
  },
}
</script>

<style lang="scss">
.back-top-com {
  position: fixed;
  right: 20px;
  bottom: 40px;
  .back-top-com-wrapper {
    cursor: pointer;
    background-color: #fff;
    font-size: 30px;
  }
}
</style>

