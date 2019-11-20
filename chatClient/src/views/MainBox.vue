<template>
  <div class="main-box-page">
    <!-- <el-main> -->
      <router-view></router-view>
    <!-- </el-main> -->
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import './../../static/css/var.scss';
.main-box-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 320px;
  height: 650px;
  border: 1px solid $border1;
  @extend .basics-box-shadow
}
</style>

