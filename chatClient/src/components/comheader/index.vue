<template>
  <div class="header__com">
    <div class="warpper">
      <i @click="$router.go(-1)" class="el-icon-arrow-left" style="color: #ffffff;"></i>
    </div>
  </div>
</template>

<style lang="scss">
.header__com {
  position: absolute;
  top: 0;
  left: 0;
  height: 40px;
  width: 100%;
  line-height: 40px;
  margin-bottom: 40px;
  background-color: rgba(0, 0, 0, .3);
  padding: 0 10px;
}
</style>

