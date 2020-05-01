<template>
  <div class="chat-area__header">
    <transition name="roll">
      <div class="header-wrapper" v-if="currentConversation.roomid">
        <div class="header-title">
          <i @click="setCurrentUI" v-if="device === 'Mobile'" style="margin-left: -15px;" class="el-icon-arrow-left"></i>
          <span>{{haderTitle}}</span>
          <!-- <i :class="!showSettingPanel ? 'el-icon-arrow-down curp' : 'el-icon-arrow-up curp'"></i> -->
          <!-- <i class="icon-qun iconfont iconic iconic-group" v-if="currentConversation.conversationType === 'GROUP'"></i> -->
          <!-- <i class="el-icon-user-solid iconic " v-else></i> -->
        </div>
        <div class="header-operation">
          <span v-if="!currentConversation.isGroup">
            <el-tooltip class="item" effect="dark" content="白板协作需要良好的网络环境" placement="top">
              <i
                v-if="device !== 'Mobile'"
                class="operation-item iconfont icon-huaban"
                @click="enterArtBoard"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="视频通话需要良好的网络环境" placement="top">
              <i class="operation-item iconfont icon-shipin" @click="videoCall"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="视频通话需要良好的网络环境" placement="top">
              <i class="operation-item el-icon-phone-outline" @click="audioCall"></i>
            </el-tooltip>
          </span>
          <i class="operation-item el-icon-menu" title="设置" @click.stop="toggleShowSettingPanel"></i>
        </div>
      </div>
    </transition>
    <transition name="roll">
      <div class="setting-panel" v-if="showSettingPanel">
        <setting-panel :current-conversation="currentConversation" @setCurrentConversation="setCurrentConversation" />  
      </div>      
    </transition>
  </div>
</template>

<script>
import './../../../../static/iconfont/iconfont.css'
import settingPanel from './settingPanel'
import { WEB_RTC_MSG_TYPE } from '@/const'
import { mapState } from 'vuex'
export default {
  props: {
    currentConversation: Object,
    setCurrentConversation: Function
  },
  data() {
    return {
      showSettingPanel: false
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    },
    beizhu() { // 备注map
      return this.userInfo.friendBeizhu || {}
    },
    haderTitle() {
      const currentConversation = this.currentConversation
      let res = ''
      if (currentConversation.isGroup) {
        res = currentConversation.groupId.title + `（${currentConversation.groupId.userNum}）`
      } else {
        res = this.beizhu[currentConversation._id] ? this.beizhu[currentConversation._id] + `（${currentConversation.nickname}）` : currentConversation.nickname
      }
      return res
    },
    ...mapState('app', {
      isToCoArtBoard: 'isToCoArtBoard',
      isVideoing: 'isVideoing',
      isAudioing: 'isAudioing'
    }),
    device() {
      return this.$store.state.device.deviceType
    }
  },
  methods: {
    enterArtBoard() {
      if (this.isToCoArtBoard || this.isVideoing || this.isAudioing) return
      this.$store.dispatch('app/SET_ISTOCOARTBOARD', true)
      this.$eventBus.$emit('web_rtc_msg', { type: WEB_RTC_MSG_TYPE.artBoard})
    },
    videoCall() {
      if (this.isToCoArtBoard || this.isVideoing || this.isAudioing) return
      this.$store.dispatch('app/SET_IS_VIDEOING', true)
      this.$eventBus.$emit('web_rtc_msg', { type: WEB_RTC_MSG_TYPE.video})
    },
    audioCall() {
      if (this.isToCoArtBoard || this.isVideoing || this.isAudioing) return
      this.$store.dispatch('app/SET_IS_AUDIOING', true)
      this.$eventBus.$emit('web_rtc_msg', { type: WEB_RTC_MSG_TYPE.audio})
    },
    toggleShowSettingPanel() {
      this.showSettingPanel = !this.showSettingPanel
    },
    watchDocumentClick() {
      if (!this.showSettingPanel) return
      this.toggleShowSettingPanel()
    },
    setCurrentUI() {
      this.$store.dispatch('device/SET_CURRENT_UI', 'conversation')
    }
  },
  watch: {
    currentConversation: {
      handler() {
        this.showSettingPanel = false
      }, immediate: true, deep: true
    }
  },
  components: {
    settingPanel
  },
  mounted() {
    document.addEventListener('click', this.watchDocumentClick)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.watchDocumentClick)
  },
}
</script>

<style lang="scss">
.chat-area__header {
  position: relative;
  box-sizing: border-box;
  height: 60px;
  padding: 0 20px;
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
  .setting-panel {
    position: absolute;
    top: 100%;
    right: 0px;
    width: 20%;
    height: 461px;
    z-index: 1005;
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

