<template>
  <div class="layout-header__com">
    <el-header>
      <div class="logo">
        <router-link to="/" class="logo-link">
          Co-Messager
          <span class="logo-img"></span>
        </router-link>
      </div>
      <div class="operation">
        <span class="item">
          <router-link to="/add" tag="span">
            加好友 <i class="el-icon-plus"></i>
          </router-link>
        </span>
        <span class="item">
          <router-link to="/mzone" tag="span">
            发动态 <i class="el-icon-plus"></i>
          </router-link>
        </span>
      </div>
      <div class="user-info">
        <el-dropdown class="droplist">
          <span class="el-dropdown-link">
            <el-badge :is-dot="validateUnReadCount > 0" class="badge-item">
              <el-avatar size="large"
                class="avatar"
                :src="IMG_URL + userInfo.photo"
                @error="() => true"
              >
                <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="" srcset="">
              </el-avatar>
            </el-badge>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="user-menu-item">
              <router-link to="/setting" class="link">
                个人设置
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item class="user-menu-item">
              <el-badge
                :value="validateUnReadCount"
                :hidden="validateUnReadCount === 0"
              >
                <router-link to="/system" class="link">
                  系统消息
                </router-link>
              </el-badge>
            </el-dropdown-item>
            <el-dropdown-item class="user-menu-item">
              <router-link to="/setting" class="link">
                主题设置
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item class="user-menu-item">
              <router-link to="/setting" class="link">
                反馈
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item class="user-menu-item">
              <a class="link" @click="logout">
                退出
              </a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="name-sigin">
          <span class="name">{{userInfo.nickname}}</span>
          <span class="sigin">{{userInfo.signature}}</span>
        </div>
      </div>
    </el-header>
    <transition name="fade">
      <vue-draggable-resizable
        v-if="isToCoArtBoard"
        drag-cancel=".drawingarea"
      >
        <div class="co-art-board">
          <co-art-board :currentconversation="currentConversation" :state="webRTCState" :web-rtc-type="WEB_RTC_MSG_TYPE.artBoard" />
        </div>
      </vue-draggable-resizable>
    </transition>
    <transition name="fade">
      <vue-draggable-resizable
        v-if="isVideoing || isAudioing"
        :x="0"
        :y="500"
        drag-cancel=".drawingarea"
      >
        <div class="co-art-board box-shadow1">
          <co-video
            :currentconversation="currentConversation"
            :state="webRTCState"
            :web-rtc-type="coVideoWebRtcType"
          />
        </div>
      </vue-draggable-resizable>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import vueDraggableResizable from 'vue-draggable-resizable'
import CoArtBoard from '@/views/CoArtBoard'
import CoVideo from '@/views/CoVideo'
import { coArtBoardReplyTypes, WEB_RTC_MSG_TYPE } from '@/const'
import { removeCookie } from '@/utils/token'

const WEB_RTC_MSG_TYPE_TEXT = {
  artBoard: '白板协作',
  video: '视频通话',
  audio: '语音通话'
}
let timer
export default {
  data() {
    return {
      webRTCState: 'apply', // 用于定义进入webRTC通信组件时的状态，如果时apply就发起请求，如果是reply就回复
      IMG_URL: process.env.IMG_URL,
      WEB_RTC_MSG_TYPE
    }
  },
  computed: {
    ...mapState('user', {
      userInfo: 'userInfo'
    }),
    ...mapState('news', {
      unreadNews: 'unreadNews'
    }),
    validateUnReadCount() {
      const validateSysUser = (this.$store.state.app.sysUsers || []).find(item => item.code === '111111')
      const key = (validateSysUser || {})._id + '-' + (this.userInfo || {})._id
      return this.unreadNews[key]
    },
    ...mapState('app', {
      isToCoArtBoard: 'isToCoArtBoard',
      isVideoing: 'isVideoing',
      isAudioing: 'isAudioing',
      currentConversation: 'currentConversation'
    }),
    coVideoWebRtcType () {
      let res = null
      if (this.isVideoing) {
        res = WEB_RTC_MSG_TYPE.video
      } else if (this.isAudioing) {
        res = WEB_RTC_MSG_TYPE.audio
      }
      return res
    }
  },
  methods: {
    logout() {
      this.$router.replace('/login')
      this.$socket.emit('leave')
      removeCookie()
    },
    webRtcMsgWatch(newVal) {
      if (newVal) {
        timer = setTimeout(() => {
          this.$alert('对方没有答应，请先等待一段时间再尝试', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
            callback: action => {
              this.$store.dispatch('app/SET_ISTOCOARTBOARD', false)
              this.$store.dispatch('app/SET_IS_AUDIOING', false)
              this.$store.dispatch('app/SET_IS_VIDEOING', false)             
            }
          });
        }, 10000)
      }
    }
  },
  components: {
    CoArtBoard,
    CoVideo,
    vueDraggableResizable
  },
  sockets: {
    apply(data) {
      // 收到了对方的请求
      console.log('收到协作请求', data)
      const webRtcType = data.webRtcType
      if (this.isToCoArtBoard || this.isVideoing || this.isAudioing) {
        this.$socket.emit('reply', {...data, type: coArtBoardReplyTypes.busy})
        return
      } else {
        let text = ''
        if (webRtcType === WEB_RTC_MSG_TYPE.artBoard) {
          text = '白板协作'
        } else if (webRtcType === WEB_RTC_MSG_TYPE.audio) {
          text = '语音通话'
        } else if (webRtcType === WEB_RTC_MSG_TYPE.video) {
          text = '视频通话'
        }
        this.$confirm(`您的好友${data.myNickname}请求与你进行${text}, 是否同意?`, "提示", {
          confirmButtonText: "同意",
          cancelButtonText: "拒绝",
          type: "warning"
        })
          .then(async () => {
            console.log('ok')
            this.webRTCState = 'reply'
            this.$store.dispatch('app/SET_CURRENT_CONVERSATION', data)
            if (webRtcType === WEB_RTC_MSG_TYPE.artBoard) {
              this.$store.dispatch('app/SET_ISTOCOARTBOARD', true)
            } else if (webRtcType === WEB_RTC_MSG_TYPE.audio) {
              this.$store.dispatch('app/SET_IS_AUDIOING', true)
            } else if (webRtcType === WEB_RTC_MSG_TYPE.video) {
              this.$store.dispatch('app/SET_IS_VIDEOING', true)
            }
            setTimeout(() => {
              clearTimeout(timer)
            }, 1000)
          })
          .catch(() => {
            this.$socket.emit('reply', {...data, type: coArtBoardReplyTypes.disagree})
          })
      }
    },
    reply(data) {
      console.log("reply", data)
      clearTimeout(timer)
      switch (data.type) {
        case coArtBoardReplyTypes.disagree:
          this.$message.error('对方拒绝了你的请求，发个消息试试吧')
          this.$store.dispatch('app/SET_ISTOCOARTBOARD', false)
          this.$store.dispatch('app/SET_IS_AUDIOING', false)
          this.$store.dispatch('app/SET_IS_VIDEOING', false)
          break;
        case coArtBoardReplyTypes.busy:
          this.$message.error('对方忙线中请稍后重试...')
          this.$store.dispatch('app/SET_ISTOCOARTBOARD', false)
          this.$store.dispatch('app/SET_IS_AUDIOING', false)
          this.$store.dispatch('app/SET_IS_VIDEOING', false)
          break;
        case coArtBoardReplyTypes.agree:
          this.$message({
            message: '对方同意你的请求',
            type: 'success'
          })
          // this.$store.dispatch('app/SET_ISTOCOARTBOARD', false)
          break;
        default:
          break;
      }
    }
  },
  watch: {
    isToCoArtBoard: {
      handler(newVal) {
        this.webRtcMsgWatch(newVal)
      }, deep: true, immediate: true
    },
    isVideoing: {
      handler(newVal) {
        this.webRtcMsgWatch(newVal)
      }, deep: true, immediate: true
    },
    isAudioing: {
      handler(newVal) {
        this.webRtcMsgWatch(newVal)
      }, deep: true, immediate: true
    }
  },
  created() {
    this.$eventBus.$on('hangup', () => {
      this.webRTCState = 'apply'
    })
  },
}
</script>

<style lang="scss">
@import './../../../../static/css/animation.scss';
.user-menu-item {
  .link {
    color: #3578E5;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
.layout-header__com {
  @import "./../../../../static/css/var.scss";
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1003;
  transform: translateY(-200px);
  .el-header {
    display: flex;
    justify-content: space-between;
    background-color: #3578E5;
    color: $normalwhite;
    line-height: 60px;
    .logo {
      position: relative;
      // width: 10%;
      cursor: pointer;
      font-size: 20px;
      .logo-link {
        text-decoration: none;
        color: #ffffff;
      }
      .logo-img {
        position: absolute;
        top: 0;
        left: 100%;
        width: 60px;
        height: 60px;
        background-image: url('./../../../../static/image/logo.jpg');
        background-size: contain;
      }
    }
    .operation {
      display: flex;
      align-items: center;
      .item {
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        border-radius: 10px;
        padding: 0 7px;
        &:hover {
          background-color: #4267B2;
        }
        &:hover {
          color: #2f2f2f;
        }
      }
    }
    .user-info {
      display: flex;
      align-items: center;
      .droplist {
        height: 60px;
        .el-badge__content.is-fixed {
          top: 17px;
        }
        .avatar {
          margin-top: 10px;
        }
      }
      .name-sigin {
        display: flex;
        flex-direction: column;
        line-height: 20px;
        margin-left: 10px;
        .name {
          font-size: 20px;
        }
        .sigin {
          font-size: 12px;
        }
      }
    }
  }
  .co-art-board {
    position: absolute;
    z-index: 1007;
    padding: 10px;
    border-radius: 5px;
    // width: 70vw;
    // height: 70vh;
    background-color: #ffffff;
  }
}
</style>

