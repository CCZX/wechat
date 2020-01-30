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
import { mapState } from 'vuex'
import conversationItem from './ConversationItem'
import { SET_UNREAD_NEWS_TYPE_MAP } from '@/store/constants'
import { conversationTypes } from '@/const'
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
  methods: {
    changeCurrentConversation(item) {
      this.$emit('setCurrentConversation', item)
    },
    joinChatRoom() { // 发送websocket消息，将会话列表加入房间
      this.conversationList.forEach(item => {
        console.log('join', item)
        this.$socket.emit("join", item)
      })
    }
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
    const id = this.$store.state.user.userInfo._id
    {const { data, status } = await this.$http.getMyFriends(id)
    if (data.status === 2000 && (100 <= status <= 400)) {
      const { data: friendList } = data
      friendList.forEach(item => {
        item.conversationType = conversationTypes.friend
      })
      this.conversationList = data.data
      this.changeCurrentConversation(this.conversationList[0])
    }}

    /**
     * 以下是获取用户的群聊会话列表，默认是优先加载user会话后加载group会话
     */
    const userName = this.$store.state.user.userInfo.name
    const { data, status } = await this.$http.getMyGroup({userName})
    if (data.status === 2000 && (100 <= status <= 400)) {
      console.log('gorup success12233', data.data)
      const { data: groupList } = data
      groupList.forEach(item => {
        item.conversationType = conversationTypes.group
        item.isGroup = true
        item.roomid = item.groupId._id
      })
      this.conversationList = [...this.conversationList, ...groupList]
    }
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

