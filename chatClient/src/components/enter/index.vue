<template>
  <div class="enter__com bottom-line">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="desc">
      <slot name="desc"></slot>
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<style lang="scss">
.enter__com {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  .title {
    color: #303133;
  }
  .desc {
    display: flex;
    align-items: center;
    color: #909399;
    font-size: 15px;
    i {
      margin-left: 3px;
    }
  }
}
</style>

