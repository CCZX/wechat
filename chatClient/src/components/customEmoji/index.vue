<template>
  <div class="custom-emoji-com" @click.stop="()=>{}">
    <el-tabs type="border-card" class="wrapper">
      <el-tab-pane v-for="(value, key, index) in emojisList" :label="key" :key="index">
        <!-- <span slot="label"><i class="iconfont icon-emoji"></i></span> -->
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
  data() {
    return {
      emojisList: emojis.data,
      selectedEmoji: ''
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
