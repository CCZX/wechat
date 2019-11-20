<template>
  <div class="cpt-sticky" :class="fixedClass" :style="{ top: top + 'px', zIndex }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    top: Number,
    parent: String,
    zIndex: Number
  },
  data() {
    return {
      fixedClass: "",
      scrollElement: null
    };
  },
  methods: {
    handleScroll() {
      // console.log(111)
      const scrollOffsetTop = this.$el.offsetTop - this.top;
      console.log(scrollOffsetTop, this.scrollElement.scrollTop)
      if (this.scrollElement.scrollTop >= scrollOffsetTop) {
        this.fixedClass = "top-fixed";
        console.log(222)
      } else {
        this.fixedClass = "";
      }
    },
    initScrollElement() {
      const element = document.querySelector(this.parent);
      if (element) {
        this.removeScrollEvent();
        console.log(element, this.$el)
        this.scrollElement = element;
        this.scrollElement.addEventListener("scroll", this.handleScroll);
      }
    },
    removeScrollEvent() {
      if (this.scrollElement) {
        this.scrollElement.removeEventListener("scroll", this.handleScroll);
      }
    }
  },
  mounted() {
    this.initScrollElement();
  },
  destroyed() {
    this.removeScrollEvent();
  }
};
</script>

<style>
.cpt-sticky.top-fixed {
  position: fixed;
  width: 100%;
  background: #fff;
}
</style>

