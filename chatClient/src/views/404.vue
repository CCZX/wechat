<template>
  <div class="err-page">
    <span class="back" @click="$router.go(-1)">返回上一页</span>
    <div class="wrapper" :style='"background-image:url(" + imgUrl + ")"'></div>
  </div>
</template>

<script>
// import imgUrl from "./../../static/image/404_2.gif";
import imgUrl from "./../../static/image/404_4.jpg";
export default {
  name: 'NotFound',
  data() {
    return {
      imgUrl
    }
  },
}
</script>

<style lang="scss">
.err-page {
  height: 100%;
  .back {
    display: block;
    position: fixed;
    bottom: 180px;
    left: 50%;
    padding: 10px 20px;
    border: 1px solid #ffffff;
    border-radius: 10px;
    color: #ffffff;
    font-size: 20px;
    cursor: pointer;
    transform: translateX(-50%);
  }
  .wrapper {
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
</style>


