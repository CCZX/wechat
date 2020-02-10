<template>
  <div class="conversationlist-com">
    <div class="search">
      <el-input
        placeholder="please input keyword"
        suffix-icon="el-icon-search"
        v-model="searchKeyWord">
      </el-input>
    </div>
    <conversation-item
      v-for="item in conversationList"
      :key="item.id"
      :conversationInfo="item"
      :currentConversation="currentConversation"
      @click.native="changeCurrentConversation(item)"
    />
  </div>
</template>

<script>
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
      conversationList: [],
      searchKeyWord: ''
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
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
        this.changeCurrentConversation(this.conversationList[0] || {})
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
  .search {
    padding-top: 10px;
  }
}
</style>

