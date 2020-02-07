<template>
  <div class="chat-area__header">
    <transition name="roll">
      <div class="header-wrapper" v-if="currentConversation.roomid">
        <div class="header-title">
          <span>{{currentConversation.isGroup ? currentConversation.groupId.title : currentConversation.nickname}}</span>
          <i class="icon-qun iconfont iconic iconic-group" v-if="currentConversation.conversationType === 'GROUP'"></i>
          <i class="el-icon-user-solid iconic " v-else></i>
        </div>
        <div class="header-operation">
          <el-tooltip class="item" effect="dark" content="白板协作需要良好的网络环境" placement="top">
            <i class="operation-item iconfont icon-huaban" @click="enterArtBoard"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="视频通话需要良好的网络环境" placement="top">
            <i class="operation-item iconfont icon-shipin"></i>
          </el-tooltip>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import './../../../../static/iconfont/iconfont.css'
export default {
  props: {
    currentConversation: Object
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    enterArtBoard() {
      this.$store.dispatch('app/SET_ISTOCOARTBOARD')
    }
  },
}
</script>

<style lang="scss">
.chat-area__header {
  box-sizing: border-box;
  height: 60px;
  padding: 0 10px;
  line-height: 60px;
  border-bottom: 1px solid #cccccc;
  .header-wrapper {
    display: flex;
    justify-content: space-between;
    .header-operation {
      .operation-item {
        font-size: 20px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
  .iconic-group::before {
    font-size: 20px;
  }
  .roll-enter {
    opacity: 0;
    transform: translateY(30px);
  }

  .roll-leave-to {
    opacity: 0;
    transform: translateY(-30px)
  }

  .roll-enter-active,
  .roll-leave-active {
    transition: all 0.6s ease;
  }
}
</style>

