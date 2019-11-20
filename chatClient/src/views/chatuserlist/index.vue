<template>
  <div class="chat-list-page">
    <list-header></list-header>
    <!-- <el-main> -->
      <router-view></router-view>
    <!-- </el-main> -->
    <list-footer></list-footer>
  </div>
</template>

<script>
import ListHeader from './components/Header'
import ListFooter from './components/Footer'
export default {
  components: {
    ListHeader,
    ListFooter
  }
}
</script>

<style lang="scss">
@import './../../../static/css/var.scss';
.chat-list-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 320px;
  height: 650px;
  // border: 1px solid $border1;
  // @extend .basics-box-shadow
}
</style>

