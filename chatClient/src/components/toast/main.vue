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
      duration: 3000
    }
  },
  mounted() {
    setTimeout(() => {
     this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    }, this.duration);
  }
};
</script>

<style scoped>
.toast {
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: #fff;
  z-index: 9999;
  background: transparent;
}
.toast>p {
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
}
</style>

