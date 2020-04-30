<template>
  <div class="custom-emoji-com" :style="device === 'Mobile' ? {width: '90%'} : {}" @click.stop="()=>{}">
    <el-tabs :tab-position="tabposition" type="border-card" class="wrapper">
      <el-tab-pane v-for="(value, key, index) in emojisList" :label="key" :key="index" addable>
        <span slot="label"><i :class="emijoIconClassNameMap[key]"></i> </span>
        <span
          class="emoji-item"
          v-for="(item, index) in value"
          :key="index"
          @click.stop="selectItem(item)"
        >
          {{item}}
        </span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import emojis from '@/const/emoji'
export default {
  props: {
    tabposition: {
      type: String,
      default() {
        return 'bottom'
      }
    }
  },
  data() {
    return {
      emojisList: emojis.data,
      selectedEmoji: '',
      emijoIconClassNameMap: {
        face: 'iconfont icon-buoumaotubiao49',
        heart: 'iconfont icon-Heart',
        food: 'iconfont icon-food',
        drink: 'iconfont icon-Colddrinkteacoffeeb',
        animal: 'iconfont icon-icon-test'
      }
    }
  },
  computed: {
    device() {
      return this.$store.state.device.deviceType
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('addemoji', item)
    }
  },
}
</script>

<style lang="scss">
.custom-emoji-com {
  width: 395px;
  .wrapper {
    transition: all .5s ease;
    .emoji-item {
      cursor: pointer;
      display: inline-block;
      width: 27px;
      height: 27px;
      padding: 3px;
    }
  }
}
</style>
