<template>
  <!-- <div class="cpt-sticky" :class="fixedClass" :style="{ top: top + 'px', zIndex, width: width + 'px' }"> -->
  <div class="cpt-sticky" :class="fixedClass" :style="{ top: top + 'px', zIndex }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    top: Number,
    parent: String,
    zIndex: Number,
    // width: Number
  },
  data() {
    return {
      fixedClass: "",
      scrollElement: null,
      offsetTop: 0
    };
  },
  methods: {
    handleScroll() {
      const scrollOffsetTop = this.offsetTop - this.top
      const scrollTop = this.parent === 'document' ? document.documentElement.scrollTop : this.scrollElement.scrollTop
      if (scrollTop >= scrollOffsetTop) {
        this.fixedClass = "top-fixed"
      } else {
        this.fixedClass = ""
      }
    },
    initScrollElement() {
      const offsetTop = this.$el.offsetTop
      this.offsetTop = offsetTop
      if (this.parent === 'document') {
        this.scrollElement = document
        this.removeScrollEvent()
        document.addEventListener('scroll', this.handleScroll)
        return
      }
      const element = document.querySelector(this.parent)
      if (element) {
        this.removeScrollEvent()
        this.scrollElement = element
        this.scrollElement.addEventListener("scroll", this.handleScroll)
      }
    },
    removeScrollEvent() {
      if (this.scrollElement) {
        this.scrollElement.removeEventListener("scroll", this.handleScroll)
      }
    }
  },
  mounted() {
    this.initScrollElement()
  },
  destroyed() {
    this.removeScrollEvent()
  }
}
</script>

<style>
.cpt-sticky.top-fixed {
  position: fixed;
  background: #fff;
}
</style>

