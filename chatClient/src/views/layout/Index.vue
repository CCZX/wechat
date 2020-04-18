<template>
  <div class="layout-page" v-css="{'background-image': 'url(' + bgImgUrl + ')'}">
    <main class="co-messager-layout">
      <my-header></my-header>
      <!-- filter-bgc是用于设置背景虚化的，因为使用了filter以及transform后fixed会改变 -->
      <div
        class="filter-bgc"
        v-css="{
          'filter': 'blur(' + blur + 'px)',
          'background-image': 'url(' + bgImgUrl + ')'
        }"
      />
      <el-main class="co-messager-main" v-css="{'opacity': opacity}">
        <audio :src="NotifyAudio" ref="audio" muted></audio>
        <div class="co-messager-aside">
          <my-aside :set-show-theme="setShowTheme" />
        </div>
        <div class="co-messager-content">
          <router-view></router-view>
        </div>
      </el-main>
    </main>
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
export default {
  name: 'Layout',
  data() {
    return {
      bgImgUrl: '',
      NotifyAudio,
      showTheme: false
    }
  },
  computed: {
    ...mapState('user', {
      userInfo: 'userInfo'
    }),
    ...mapState('theme', {
      opacity: 'opacity',
      blur: 'blur',
      bgImg: 'bgImg'
    }),
    allConversation() {
      return this.$store.state.app.allConversation
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
        if (bgImg.includes('base64')) {
          this.bgImgUrl = bgImg
        } else {
          this.bgImgUrl = systemPictureMap[bgImg]
        }
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
  .co-messager-layout {
    box-sizing: border-box;
    height: 100%;
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
      .co-messager-aside {
        width: 7%;
        height: 100%;
        border-right: 1px solid #cccccc;
      }
      .co-messager-content {
        width: 93%;
      }
    }
  }
}
</style>
