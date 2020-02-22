<template>
  <div class="part-title-cmp">
    <span class="part-bg" :style="'background-color:' + bgc"></span>
    <span class="part-text">{{text}}</span>
  </div>
</template>

<script>
export default {
  props: {
    bgc: {
      type: String,
      default() {
        return '#1890ff'
      }
    },
    text: {
      type: String,
      default() {
        return 'partTitle'
      }
    }
  }
}
</script>

<style lang="scss">
.part-title-cmp {
  margin: 10px 0;
  display: flex;
  align-items: center;
  .part-bg {
    display: inline-block;
    margin-right: 10px;
    width: 5px;
    height: 20px;
    background-color: #fff;
  }
}
</style>
