<template>
  <div class="back-top-com">
    <div class="back-top-com-wrapper" v-if="show" @click="goTop" title="Back Top">
      <i class="el-icon-arrow-up"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ['target'],
  data() {
    return {
      show: false,
      element: null
    }
  },
  methods: {
    goTop() {
      this.element.scrollTop = 0
    },
    watchDocmentScroll() {
      const scrollTop = this.element.scrollTop
      if (scrollTop > 2000) {
        this.show = true
      } else {
        this.show = false
      }
    }
  },
  mounted() {
    const element = document.querySelector(this.target)
    if (!element) return
    this.element = element
    element.addEventListener('scroll', this.watchDocmentScroll)
    this.watchDocmentScroll()
  },
  beforeDestroy() {
    this.element.removeEventListener('scroll', this.watchDocmentScroll)
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

