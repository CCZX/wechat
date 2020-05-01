<template>
  <div class="conversationlist-com">
    <div
      class="search"
      :style="device === 'Mobile' ? {marginLeft: '50px'} : {}"
    >
      <top-search />
    </div>
    <div class="todo">
      <todo />
    </div>
    <el-tabs type="border-card" :stretch="true">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-chat-line-round"></i></span>
        <recent-conversation-list
          :current-conversation="currentConversation"
          :set-current-conversation="setCurrentConversation"
          @setCurrentConversation="setCurrentConversation"
        />
      </el-tab-pane>
      <el-tab-pane label="好友">
        <span slot="label"><i class="el-icon-user"></i></span>
        <div class="friend-tab-header space-bw">
          <el-input size="mini" v-model="newFenzuName" placeholder="请输入分组名" style="marginRight: 5px" />
          <el-button size="mini" type="success" @click="addNewFenzu" :loading="isAdding">添加</el-button>
        </div>
        <fenzu-conversation-list
          :current-conversation="currentConversation"
          :set-current-conversation="setCurrentConversation"
          @setCurrentConversation="setCurrentConversation"
        />
      </el-tab-pane>
      <el-tab-pane label="群">
        <span slot="label"><i style="fontSize: 16px" class="icon-qunzu iconfont"></i></span>
        <group-conversation-list
          :current-conversation="currentConversation"
          :set-current-conversation="setCurrentConversation"
          @setCurrentConversation="setCurrentConversation"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import './../../../static/iconfont/iconfont.css'
import recentConversationList from './RecentConversation'
import fenzuConversationList from './FenzuConversation'
import groupConversationList from './GroupConversation'
import todo from '@/components/todo'
import topSearch from './TopSearch'
import { SET_UNREAD_NEWS_TYPE_MAP } from '@/store/constants'
import { conversationTypes } from '@/const'
import { saveMyFriendsToLocalStorage, saveMyGroupToLocalStorage } from '@/utils'
export default {
  name: "ConversationListComponent",
  props: {
    currentConversation: Object,
    setCurrentConversation: Function
  },
  data() {
    return {
      /**
       * {
          _id: 对方的ID
          conversationType:"FRIEND"
          createDate:"2020-02-10T00:00:00.000Z"
          myAvatar:"/img/picture.png"
          myId:"5d9d929f49db3825a8e76a04"
          myNickname:"chenchao"
          nickname:"chenchao2"
          photo:"/uploads/2019-11-10/f-1573390856438-f1573390856092.png"
          roomid:"5d9d929f49db3825a8e76a04-5d9d903f49db3825a8e76a03"
          signature:"hahahha,笑死我了...."
       * }
       */
      conversationList: [],
      searchKeyWord: '',
      newFenzuName: '', // 新添加的分组名称
      activeFriendFenzu: [],
      activeGorupFenzu: [],
      isAdding: false // 是否正在添加分组
    }
  },
  computed: {
    userInfo() { // 用户信息
      return this.$store.state.user.userInfo
    },
    friendFenzu() { // 获取所有分组 [分组1， 分组2]
      return Object.keys(this.userInfo.friendFenzu)
    },
    device() {
      return this.$store.state.device.deviceType
    }
  },
  methods: {
    async addNewFenzu() {
      if (!this.newFenzuName.trim()) return
      if (this.friendFenzu.includes(this.newFenzuName.trim())) {
        this.$message({type: 'warning', message: '已有该分组'})
      }
      this.isAdding = true
      const params = {
        name: this.newFenzuName.trim(),
        userId: this.userInfo._id
      }
      const { data } = await this.$http.addNewFenzu(params)
      if (data.status !== 2000) {
        this.$message({message: data.msg, type: warning})
      }
      this.newFenzuName = ''
      const userInfo = await this.$http.getUserInfo(this.userInfo._id)
      this.isAdding = false
      this.$store.dispatch('user/LOGIN', userInfo.data.data)
    },
    joinChatRoom() { // 发送websocket消息，将会话列表加入房间
      this.conversationList.forEach(item => {
        this.$socket.emit("join", item)
      })
    }
  },
  // sockets: {
  //   async receiveAgreeFriendValidate(data) {
  //     console.log('receiveAgreeFriendValidate conversationlist', data)
  //     await this.getMyFriends()
  //     this.getMyGroup()
  //   },
  // },
  // watch: {
  //   conversationList: {
  //     handler() {
  //       this.joinChatRoom()
  //     }, deep: true, immediate: true
  //   },
  //   '$store.state.app.agreeFriendValidate': {
  //     async handler(newVal, oldVal) {
  //       if (newVal) {
  //         await this.getMyFriends()
  //         this.getMyGroup()
  //       }
  //     }, immediate: true, deep: true
  //   }
  // },
  components: {
    recentConversationList,
    fenzuConversationList,
    groupConversationList,
    todo,
    topSearch
  },
}
</script>

<style lang="scss">
@import './../../../static/css/var.scss';
.conversationlist-com {
  height: 100%;
  padding: 0 5px;
  .search {
    padding: 10px 0;
  }
  .todo {
    padding-bottom: 10px;
  }
  .el-tabs.el-tabs--top.el-tabs--border-card {
    height: calc(100% - 120px);
    overflow-x: hidden;
    background-color: $normalbg;
    .el-tabs__header {
      background-color: $seatbg;
      // background-color: $secondarybg;
      .el-tabs__item.is-active {
        background-color: $normalbg;
      }
    }
    .el-tabs__content {
      padding: 0;
      height: calc(100% - 40px);
      background-color: $normalbg;
      // overflow: scroll;
      // overflow-x: hidden;
      position: relative;
      .friend-tab-header {
        padding: 10px;
      }
    }
  }
  .el-collapse {
    .el-collapse-item__header {
      padding-left: 10px;
    }
    .el-collapse-item__content {
      padding-bottom: 0;
    }
  }
}
</style>

