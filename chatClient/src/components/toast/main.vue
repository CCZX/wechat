<template>
  <div class="toast" :class="type?`toast--${type}`: '' ">
    <p>{{content}}</p>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      type: "",
      content: "",
      // duration: 3000
    }
  },
  mounted() {
    // setTimeout(() => {
    //  this.$destroy(true);
    //   this.$el.parentNode.removeChild(this.$el);
    // }, this.duration);
  }
};
</script>

<style scoped>
.toast {
  width: 100px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: 10px auto 0;
  /* color: #fff; */
  z-index: 9999;
}
/* .toast>p {
  padding: 12px 22px;
  font-size: 18px;
  border-radius: 4px;
  background: rgba(17, 17, 17, 0.7);
}
.toast.toast--error {
  background: rgba(255, 0, 0, 0.5);
}
.toast.toast--success {
  background: rgba(0, 255, 0, 0.5);
} */
</style>

