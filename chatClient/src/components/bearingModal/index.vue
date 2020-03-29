/**
  通用承载modal框
 */
<template>
  <div class="bearing-modal all0">
    <div class="bearing-modal-content hor-ver-center" :style="{'width': width + 'px'}">
      <div class="header">
        <span>{{title}}</span>
        <i class="el-icon-close p-r-t" @click="close"></i>
      </div>
      <div class="body">
        <slot name="body"></slot>
      </div>
      <div class="footer" v-if="showFooter">
        <!-- 默认不展示footer -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    width: {
      type: Number, // bearing-modal-content宽度
      default: 300
    },
    showFooter: {
      type: Boolean,
      deafult: false
    }
    /**
     * 绑定的函数
     * 1. close；关闭modal框
     * 2. submit；确认
     */
  },
  methods: {
    close() {
      this.$emit('close')
    }
  },
}
</script>

<style lang="scss">
.bearing-modal {
  position: fixed;
  z-index: 2003;
  background-color: rgba(0, 0, 0, .2);
  .bearing-modal-content {
    position: relative;
    width: 300px;
    padding: 10px 20px;
    background-color: #fff;
    border-radius: 10px;
    .body {
      margin: 10px 0;
    }
  }
}
</style>
