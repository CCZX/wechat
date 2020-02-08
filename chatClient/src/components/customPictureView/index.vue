<template>
  <div class="custom-picture-view-com">
    <div class="picture-view-heder">
      <i class="icon el-icon-picture"></i><span class="statstics secondary-font">图片{{pitures.length}}/{{size}}</span>
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
    }
  },
}
</script>

<style lang="scss">
.custom-picture-view-com {
  .picture-view-heder {
    padding-bottom: 10px;
    .icon {
      font-size: 20px;
    }
    .statstics {
      margin-left: 10px;
    }
  }
  .picture-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .picture-item {
      position: relative;
      .close {
        position: absolute;
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
