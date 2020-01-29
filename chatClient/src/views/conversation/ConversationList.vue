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
    joinChatRoom() {
      this.conversationList.forEach(item => {
        this.$socket.emit("join", item)
      })
    }
  },
  
  watch: {
    conversationList: {
      handler() {
        this.joinChatRoom()
      },
      deep: true,
      immediate: true
    }
  },
  components: {
    conversationItem
  },
  async created() {
    let id = this.$store.state.user.userInfo._id
    this.$http.getMyFriends(id).then(res => {
      let { data, status } = res.data
      if (res.status === 200 && status === 2000) {
        this.conversationList = data
        this.changeCurrentConversation(this.conversationList[0])
      }
    })

    /**
     * 以下是获取用户的群聊会话列表
     */
    // let userName = this.$store.state.user.userInfo.name
    // const { data, status } = await this.$http.getMyGroup({userName})
    // console.log('gorup success123')
    // if (data.status === 2000 && status === 200) {
    //   const { data: groupList } = data
    //   groupList.forEach(item => {
    //     item.isGroup = true
    //   })
    //   this.conversationList = [...this.conversationList, ...groupList]
    // }
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

