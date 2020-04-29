<template>
  <div class="layout-page" v-css="{'background-image': 'url(' + bgImgUrl + ')'}">
    <div v-if="!device === 'Mobile'" class="toggle" @click="setShowMain" title="切换聊天区域是否显示">
      <i class="icon el-icon-thumb"></i>
    </div>
    <transition name="fade">
      <main v-show="showMain" class="co-messager-layout">
        <my-header></my-header>
        <!-- filter-bgc是用于设置背景虚化的，因为使用了filter以及transform后fixed会改变 -->
        <div
          v-if="!device === 'Mobile'"
          class="filter-bgc"
          v-css="{
            'filter': 'blur(' + blur + 'px)',
            'background-image': 'url(' + bgImgUrl + ')'
          }"
        />
        <el-main
          :class="device === 'Mobile' ? 'co-messager-main mobile' : 'co-messager-main'"
          v-css="{'opacity': opacity}"
        >
          <audio :src="NotifyAudio" ref="audio" muted></audio>
          <div :class="device === 'Mobile' ? 'co-messager-aside mobile' : 'co-messager-aside'">
            <my-aside :set-show-theme="setShowTheme" />
          </div>
          <div :class="device === 'Mobile' ? 'co-messager-content mobile' : 'co-messager-content'">
            <router-view></router-view>
          </div>
        </el-main>
      </main>
    </transition>
    <transition name="fade">
      <theme v-if="showTheme" @setShowTheme="setShowTheme" />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import myHeader from './components/Header'
import myAside from './components/Aside'
import { APP_VERSION } from '@/const'
import { saveRecentConversationToLocal } from '@/utils'
import { SET_UNREAD_NEWS_TYPE_MAP } from '@/store/constants'
import theme from '@/components/theme'
import NotifyAudio from './../../../static/audio/notify.mp3'
const systemPictureMap = {
  abstract: require('./../../../static/image/theme/abstract.jpg'),
  city: require('./../../../static/image/theme/city.jpg'),
  ocean: require('./../../../static/image/theme/ocean.jpg')
}
const notifySoundMap = {
  default: require('./../../../static/audio/default.mp3'),
  apple: require('./../../../static/audio/apple.mp3'),
  pcqq: require('./../../../static/audio/pcqq.mp3'),
  momo: require('./../../../static/audio/momo.mp3'),
  huaji: require('./../../../static/audio/huaji.mp3'),
  mobileqq: require('./../../../static/audio/mobileqq.mp3'),
  none: ''
}
export default {
  name: 'Layout',
  data() {
    return {
      bgImgUrl: '',
      NotifyAudio: '',
      // notifySound: '',
      showTheme: false,
      showMain: true // 聊天区域是否展示
    }
  },
  computed: {
    ...mapState('user', {
      userInfo: 'userInfo'
    }),
    ...mapState('theme', {
      opacity: 'opacity',
      blur: 'blur',
      bgImg: 'bgImg',
      notifySound: 'notifySound'
    }),
    allConversation() {
      return this.$store.state.app.allConversation
    },
    device() {
      return this.$store.state.device.deviceType
    }
  },
  watch: {
    userInfo: {
      handler(newVal, oldVal) {
        this.userGoOnline()
      },
      deep: true,
      immediate: true
    },
    bgImg: {
      handler(bgImg) {
        /**如果是base64就直接使用否则从系统自带图片获取 */
        if (bgImg.includes('base64')) {
          this.bgImgUrl = bgImg
        } else {
          this.bgImgUrl = systemPictureMap[bgImg]
        }
      }, deep: true, immediate: true
    },
    notifySound: {
      handler(notifySound) {
        this.NotifyAudio = notifySoundMap[notifySound]
      }, deep: true, immediate: true
    }
  },
  components: {
    myHeader,
    myAside,
    theme
    // chatView
  },
  sockets: {
    connect: function () {
      console.log('socket connected', this.$socket.id)
    },
    onlineUser(data) {
      console.log('当前在线用户列表', data)
      const onlineUserIdArr = Object.values(data).map(item => item._id)
      this.$store.dispatch('app/SET_ONLINE_USER', onlineUserIdArr)
    },
    receiveMessage(news) {
      this.$refs['audio'].play()
      console.log('收到新消息', news)
      const message = news.message ? news.message.slice(0, 10) : ''
      this.$notify({
        title: '收到新消息',
        message,
        type: 'success'
      })
      this.$store.dispatch('news/SET_UNREAD_NEWS', {
        roomid: news.roomid,
        count: 1,
        type: 'ADD'
      })
      const senderConversation = this.allConversation.find(item => item.roomid === news.roomid)
      this.$store.dispatch('app/SET_RECENT_CONVERSATION', {
        type: 'add',
        data: senderConversation
      })
      this.$store.dispatch('news/SET_LAST_NEWS', {
        type: 'edit',
        res: {
          roomid: news.roomid,
          news: news
        }
      })
      saveRecentConversationToLocal(news.senderId)
    },
    receiveValidateMessage(news) {
      this.$refs['audio'].play()
      console.log('收到新的验证消息', news)
      this.$store.dispatch('news/SET_UNREAD_NEWS', {
        roomid: news.roomid,
        count: 1,
        type: SET_UNREAD_NEWS_TYPE_MAP.add
      })
    },
    receiveAgreeFriendValidate(data) {
      console.log('receiveAgreeFriendValidate', data)
    },
    conversationList(list) {
      // console.log("当前会话列表", list)
    },
    /**
     * 发送的消息被对方读取了
     */
    isReadMsg(val) {
      console.log('isReadMsg', val)
      const { roomid, status } = val
      this.$store.dispatch('news/SET_USER_IS_READ_MSG', {
        roomid,
        status
      })
    }
  },
  methods: {
    userGoOnline() {
      this.$socket.emit('goOnline', this.userInfo)
    },
    /**
     * 获取系统用户（比如发送验证消息的系统用户）,然后加入会话列表
     */
    async sysUserJoinSocket() {
      const { data } = await this.$http.getSysUsers()
      const { data: sysUserList, status } = data
      if (status === 2000) {
        sysUserList.forEach(item => {
          this.$store.dispatch('app/SET_SYS_USERS', sysUserList)
          const val = {
            roomid: item._id + '-' + this.userInfo._id
          }
          this.$socket.emit('join', val)
        })
      }
    },
    setShowTheme(flag) {
      this.showTheme = flag
    },
    setShowMain() {
      this.showMain = !this.showMain
    }
  },
  mounted() {
    this.$socket.emit('connect')
    this.sysUserJoinSocket()
    console.log(
      `%c Messger V${APP_VERSION} Started %c Contact: ccdebuging@gmail.com %c`,
      'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
      'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
      'background:transparent'
    )
  }
}
</script>

<style lang="scss">
.layout-page {
  @import './../../../static/css/var.scss';
  @import './../../../static/css/animation.scss';
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-color: #e9ebee;
  position: relative;
  transition: all .4s ease-out;
  .toggle {
    position: fixed;
    .icon {
      padding: 5px;
      font-size: 20px;
      color: #ffffff;
      border: 1px solid #ffffff;
      border-radius: 50%;
    }
  }
  .co-messager-layout {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    .filter-bgc {
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -336px 0 0 -510px;
      width: 1020px;
      height: 672px;
      filter: blur(10px);
      background-repeat: no-repeat;
      background-size: cover;
      background-attachment: fixed;
    }
    .co-messager-main {
      display: flex;
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -336px 0 0 -510px;
      width: 1020px;
      height: 672px;
      background-color: #e9ebee;
      color: #333;
      border-radius: 5px;
      padding: 0;
      opacity: .8;
      /*针对移动端做特殊处理*/
      &.mobile {
        left: 0;
        top: 0;
        margin: 0;
        width: 100%;
        height: 100%;
      }
      .co-messager-aside {
        width: 7%;
        height: 100%;
        border-right: 1px solid #cccccc;
        &.mobile {
          width: 20%;
        }
      }
      .co-messager-content {
        width: 93%;
        &.mobile {
          width: 80%;
        }
      }
    }
  }
}
</style>
