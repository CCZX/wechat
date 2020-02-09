<template>
  <div class="layout-page">
    <main class="layout-main">
      <my-header></my-header>
      <el-main class="el-main">
        <audio :src="NotifyAudio" ref="audio" muted></audio>
        <router-view></router-view>
      </el-main>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import myHeader from './components/Header'
import bgImgUrl from './../../../static/image/bg.jpg'
import { APP_VERSION } from '@/const'
import { SET_UNREAD_NEWS_TYPE_MAP } from '@/store/constants'
import NotifyAudio from './../../../static/audio/notify.mp3'
export default {
  name: 'Layout',
  data() {
    return {
      bgImgUrl,
      NotifyAudio
    }
  },
  computed: {
    ...mapState('user', {
      userInfo: 'userInfo'
    })
  },
  watch: {
    userInfo: {
      handler(newVal, oldVal) {
        this.userGoOnline()
      },
      deep: true,
      immediate: true
    }
  },
  components: {
    myHeader,
    // chatView
  },
  sockets: {
    connect: function () {
      console.log('socket connected', this.$socket.id)
    },
    onlineUser(data) {
      console.log('当前在线用户列表', data)
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
      console.log("当前会话列表", list)
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
  min-height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #e9ebee;
  .layout-main {
    box-sizing: border-box;
    min-height: 100%;
    .el-main {
      min-height: calc(100vh - 60px);
      background-color: #e9ebee;
      color: #333;
      display: flex;
      padding: 0;
    }
  }
}
</style>


