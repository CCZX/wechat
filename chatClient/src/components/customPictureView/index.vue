<template>
  <div class="custom-picture-view-com">
    <div class="picture-view-heder">
      <span class="info">
        <i class="icon el-icon-picture"></i><span class="statstics secondary-font">图片{{pitures.length}}/{{size}}</span>
      </span>
      <span class="delete">
        <i class="icon close el-icon-close" @click="deleteAll" title="关闭"></i>
      </span>
    </div>
    <div class="picture-list">
      <div class="picture-item" v-for="(item, index) in pitures" :key="index">
        <i class="close el-icon-close" @click="deleteItem(index)"></i>
        <img class="img" :src="item" alt="" srcset="">
      </div>
    </div>
  </div>
</template>

// http://blog.static.chenr.cn/cc-messger-170240566a4-56.jpeg
<script>
export default {
  props: {
    pitures: {
      type: Array
    },
    size: Number,
  },
  methods: {
    deleteItem(index) {
      this.$emit('deleteItem', index)
    },
    deleteAll() {
      this.$emit('deleteAll')
    }
  },
}
</script>

<style lang="scss">
.custom-picture-view-com {
  .picture-view-heder {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    .icon {
      font-size: 20px;
      cursor: pointer;
    }
    .statstics {
      margin-left: 10px;
    }
  }
  .picture-list {
    overflow: hidden;
    .picture-item {
      position: relative;
      float: left;
      margin-right: 10px;
      .close {
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .2);
        color: #ffffff;
        cursor: pointer;
      }
      .img {
        width: 270px;
      }
    }
  }
}
</style>
