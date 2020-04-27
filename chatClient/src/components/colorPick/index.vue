<template>
  <div class="color-pick-cmp box-shadow1">
    <div class="current-color">
      <span class="color-item"></span>
    </div>
    <span class="tips el-icon-info" style="display: inline-block;margin-bottom: 10px">请输入正确16进制色值</span>
    <div class="color-list">
      <span
        v-for="item in colorList"
        :key="item"
        :class=" `#${currentColor}` === item ? 'color-item is-select' : 'color-item'"
        v-css="{'background-color': item}"
        @click="selectColor(item)"
      />
      <el-input :class=" colorError ? 'color-value error' : 'color-value'" size="small" placeholder="自定义颜色" v-model="currentColor">
        <template slot="prepend">#</template>
      </el-input>
    </div>
  </div>
</template>

<script>
import { colorHexReg } from '@/utils/reg'
const initColors = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084',
 '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF', '#000000']
export default {
  props: {
    color: String, // 当前颜色
  },
  data() {
    return {
      colorList: initColors,
      currentColor: '',
      colorError: false
    }
  },
  methods: {
    selectColor(color) {
      this.currentColor = color.slice(1)
      // this.$emit('change', color)
    },
    initCurrentColor() {
      if (this.color) {
        this.currentColor = this.color.slice(1)
      } else {
        this.currentColor = this.colorList[0].slice(1)
      }
    }
  },
  watch: {
    currentColor: {
      handler(color) {
        if (!colorHexReg.test(`#${color}`)) {
          this.colorError = true
        } else {
          this.colorError = false
          this.$emit('change', `#${color}`)
        }
      }
    }
  },
  mounted() {
    this.initCurrentColor()
  },
}
</script>

<style lang="scss">
.color-pick-cmp {
  width: 290px;
  padding: 10px;
  .color-list {
    display: flex;
    flex-wrap: wrap;
    .color-item {
      position: relative;
      display: inline-block;
      width: 30px;
      height: 30px;
      margin: 0 10px 10px 0;
      border-radius: 5px;
      &:nth-child(7n) {
        margin-right: 0;
      }
      &.is-select {
        box-shadow: 0 0 3px 2px #409eff;
      }
      &:hover {
        box-shadow: 0 0 3px 2px #409eff;
      }
    }
    .color-value {
      width: 110px;
      &.error {
        input {
          border-color: red;
        }
      }
      .el-input-group__prepend {
        padding: 0 10px;
      }
    }
  }
}
</style>
