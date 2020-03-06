<template>
  <div class="conversationlist-com">
    <div class="search">
      <el-input
        placeholder="please input keyword"
        suffix-icon="el-icon-search"
        v-model="searchKeyWord">
      </el-input>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-chat-line-round"></i></span>
        <conversation-item
          v-for="item in hasBeizhuConversationList"
          :key="item.id"
          :conversationInfo="item"
          :currentConversation="currentConversation"
          @click.native="changeCurrentConversation(item)"
        />
      </el-tab-pane>
      <el-tab-pane label="好友">
        <span slot="label"><i class="el-icon-user"></i></span>
        <div class="friend-tab-header space-bw">
          <el-input v-model="newFenzuName" placeholder="请输入分组名" style="marginRight: 5px" />
          <el-button type="success" @click="addNewFenzu" :loading="isAdding">添加分组</el-button>
        </div>
        <el-collapse v-model="activeFriendFenzu">
          <el-collapse-item v-for="(item, index) in friendFenzu" :key="index" :title="`${item}（${fenzuUserList[item].length}）`" :name="item">
            <conversation-item
              v-for="item in fenzuUserList[item]"
              :key="item.id"
              :conversationInfo="item"
              @click.native="changeCurrentConversation(item)"
            />
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="群">
        <span slot="label"><i style="fontSize: 16px" class="icon-qun iconfont iconic iconic-group"></i></span>
        <el-collapse v-model="activeGorupFenzu">
          <el-collapse-item :title="`我创建的群聊（${myHolderGroup.length}）`" name="holder">
            <conversation-item
              v-for="item in myHolderGroup"
              :key="item.id"
              :conversationInfo="item"
              @click.native="changeCurrentConversation(item)"
            />
          </el-collapse-item>
          <el-collapse-item :title="`我加入的群聊（${myJoinGroup.length}）`" name="join">
            <conversation-item
              v-for="item in myJoinGroup"
              :key="item.id"
              :conversationInfo="item"
              @click.native="changeCurrentConversation(item)"
            />
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import './../../../static/iconfont/iconfont.css'
import conversationItem from './ConversationItem'
import { SET_UNREAD_NEWS_TYPE_MAP } from '@/store/constants'
import { conversationTypes } from '@/const'
import { saveMyFriendsToLocalStorage, saveMyGroupToLocalStorage } from '@/utils'
export default {
  name: "ConversationListComponent",
  props: {
    currentConversation: Object,
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
    friendBeizhu() { // 好友备注Map {id2: '备注1', id1: '备注2'}
      return this.userInfo.friendBeizhu || {}
    },
    friendConversationList() { // 好友
      return this.conversationList.filter(item => item.conversationType === conversationTypes.friend)
    },
    groupConversationList() { // 群聊
      return this.conversationList.filter(item => item.conversationType === conversationTypes.group)
    },
    hasBeizhuConversationList() { // 给会话加上备注
      const conversationList = JSON.parse(JSON.stringify(this.conversationList))
      return conversationList.map(item => {
        item.beizhu = this.friendBeizhu[item._id] ? this.friendBeizhu[item._id] : ''
        return item
      })
    },
    friendFenzu() { // 获取所有分组 [分组1， 分组2]
      return Object.keys(this.userInfo.friendFenzu)
    },
    fenzuUserList() { // 根据分组分类
      const myFenzuInfo = this.userInfo.friendFenzu
      const myFriends = this.hasBeizhuConversationList.filter(item => item.conversationType === conversationTypes.friend)
      const myFenzuKeys = Object.keys(myFenzuInfo)
      const res = {}
      myFenzuKeys.forEach(item => {
        res[item] = []
      })
      for (let i = 0; i < myFriends.length; i++) {
        const friendItem = myFriends[i]
        myFenzuKeys.forEach(fenzuKey => {
          if (myFenzuInfo[fenzuKey].includes(friendItem._id)) {
            res[fenzuKey].push(friendItem)
            myFriends.splice(i, 1)
            i--
          }
        })
      }
      if (myFriends.length) {
        res['我的好友'] = [...res['我的好友'], ...myFriends]
      }
      return res
    },
    myHolderGroup() {
      return this.groupConversationList.filter(item => item.holder)
    },
    myJoinGroup() {
      return this.groupConversationList.filter(item => !item.holder)
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
    changeCurrentConversation(item) {
      this.$emit('setCurrentConversation', item)
    },
    joinChatRoom() { // 发送websocket消息，将会话列表加入房间
      this.conversationList.forEach(item => {
        this.$socket.emit("join", item)
      })
    },
    async getMyFriends() {
      const id = this.userInfo._id
      const { data, status } = await this.$http.getMyFriends(id)
      if (data.status === 2000 && (100 <= status <= 400)) {
        const { data: friendList } = data
        friendList.forEach(item => {
          item.conversationType = conversationTypes.friend
          item.myNickname = this.userInfo.nickname
          item.myId = this.userInfo._id
          item.myAvatar = this.userInfo.photo
        })
        this.conversationList = friendList
        // this.changeCurrentConversation(this.conversationList[0] || {})
        // 把好友的id保存到本地，可能会用到
        const saveLocalData = friendList.map(item => {
          return item._id
        })
        saveMyFriendsToLocalStorage(saveLocalData)
      }
    },
    async getMyGroup() {
      const userName = this.userInfo.name
      const { data, status } = await this.$http.getMyGroup({userName})
      if (data.status === 2000 && (100 <= status <= 400)) {
        const { data: groupList } = data
        groupList.forEach(item => {
          item.conversationType = conversationTypes.group
          item.isGroup = true
          item.roomid = item.groupId._id
        })
        this.conversationList = [...this.conversationList, ...groupList]
        const saveLocalData = groupList.map(item => item.groupId._id)
        saveMyGroupToLocalStorage(saveLocalData)
      }
    }
  },
  sockets: {
    async receiveAgreeFriendValidate(data) {
      console.log('receiveAgreeFriendValidate conversationlist', data)
      await this.getMyFriends()
      this.getMyGroup()
    },
  },
  watch: {
    conversationList: {
      handler() {
        this.joinChatRoom()
      }, deep: true, immediate: true
    },
    '$store.state.app.agreeFriendValidate': {
      async handler(newVal, oldVal) {
        if (newVal) {
          await this.getMyFriends()
          this.getMyGroup()
        }
      }, immediate: true, deep: true
    }
  },
  components: {
    conversationItem
  },
  async created() {
    await this.getMyFriends()
    this.getMyGroup()
  }
}
</script>

<style lang="scss">
.conversationlist-com {
  height: 100%;
  padding: 0 10px;
  .search {
    padding: 10px 0;
  }
  .el-tabs.el-tabs--top.el-tabs--border-card {
    height: calc(100% - 60px);
    .el-tabs__content {
      padding: 0;
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

