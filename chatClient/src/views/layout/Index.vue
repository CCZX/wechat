<template>
  <div class="layout-page">
    <main class="co-messager-layout">
      <my-header></my-header>
      <el-main class="co-messager-main">
        <audio :src="NotifyAudio" ref="audio" muted></audio>
        <div class="co-messager-aside">
          <my-aside />
        </div>
        <div class="co-messager-content">
          <router-view></router-view>
        </div>
      </el-main>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import myHeader from './components/Header'
import myAside from './components/Aside'
import bgImgUrl from './../../../static/image/bg.jpg'
import { APP_VERSION } from '@/const'
import { saveRecentConversationToLocal } from '@/utils'
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
    }
  },
  components: {
    myHeader,
    myAside
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
  height: 100%;
  background-image: url('./../../../static/image/1.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-color: #e9ebee;
  padding: 30px 0;
  position: relative;
  .co-messager-layout {
    box-sizing: border-box;
    height: 100%;
    .co-messager-main {
      display: flex;
      width: 1020px;
      height: 100%;
      margin:0 auto;
      background-color: #e9ebee;
      color: #333;
      border-radius: 5px;
      padding: 0;
      opacity: .8;
      .co-messager-aside {
        width: 7%;
        height: calc(100vh - 60px);
        // position: sticky;
        // top: 60px;
        border-right: 1px solid #cccccc;
      }
      .co-messager-content {
        width: 93%;
      }
    }
  }
}
</style>
