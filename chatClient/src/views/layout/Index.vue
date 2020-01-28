<template>
  <!-- <div class="layout-page" :style='"background-image:url(" + bgImgUrl + ")"'> -->
  <div class="layout-page">
    <main class="layout-main">
      <my-header></my-header>
      <el-main>
        <router-view></router-view>
        <!-- <div class="right-layout">
          <div class="chat">
            <chat-view></chat-view>
          </div>
          <div class="weather">
            weather
          </div>
          <div class="todo-list">
            todo
          </div>
        </div> -->
      </el-main>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import myHeader from './components/Header'
// import chatView from '@/views/chat'
import bgImgUrl from './../../../static/image/bg.jpg'
export default {
  name: 'Layout',
  data() {
    return {
      bgImgUrl
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
        console.log('usergoonlie', newVal, oldVal)
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
  sockets: {//将（socket.on）绑定事件放在sockets中
    connect: function () {
      console.log('socket connected', this.$socket.id)
    },
    customEmit: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)',data)
    },
    onlineUser(data) {
      console.log('onlineuser', data)
    }
  },
  methods: {
    userGoOnline() {
      this.$socket.emit('goOnline', this.userInfo)
    }
  },
  mounted() {
    this.$socket.emit('connect')
  },
}
</script>

<style lang="scss">
.layout-page {
  @import './../../../static/css/var.scss';
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  // filter: blur(3px);
  .layout-main {
    // filter: none;
    box-sizing: border-box;
    height: 100%;
    // padding: 0 100px;
    .el-main {
      height: calc(100vh - 60px);
      background-color: #f8f8f9;
      color: #333;
      display: flex;
      padding: 0;
      // text-align: center;
      // line-height: 160px;
      .right-layout {
        display: flex;
        justify-content: space-between;
        align-content: space-between;
        flex-wrap: wrap;
        padding: 0 0 0 30px;
        flex-grow: 1;
        .chat {
          width: 100%;
          height: 400px;
          @extend .basics-box-shadow;
        }
        .weather {
          width: 28%;
          height: 230px;
          @extend .basics-box-shadow;
        }
        .todo-list {
          width: 70%;
          height: 230px;
          @extend .basics-box-shadow;
        }
      }
    }
  }
}
</style>


