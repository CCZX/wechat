<template>
  <div class="userlist-com">
    <user-item
      v-for="item in userList"
      :key="item.id"
      :userinfo="item"
      @click.native="changeCurrentConversation(item)"
      :currentConverssation="currentConverssation"
    />
  </div>
</template>

<script>
import UserItem from './UserItem'
export default {
  name: "UserListComponent",
  props: {
    currentConverssation: Object,
  },
  data() {
    return {
      userList: []
    }
  },
  methods: {
    changeCurrentConversation(item) {
      this.$emit('setCurrentConversation', item)
    },
    joinChatRoom() {
      this.userList.forEach(item => {
        this.$socket.emit("join", item)
      })
    }
  },
  watch: {
    userList: {
      handler() {
        this.joinChatRoom()
      },
      deep: true,
      immediate: true
    }
  },
  components: {
    UserItem
  },
  created() {
    let id = this.$store.state.user.userInfo._id
    this.$http.getMyFriends(id).then(res => {
      let { data, status } = res.data
      if (res.status === 200 && status === 2000) {
        this.userList = data
        this.changeCurrentConversation(this.userList[0])
      }
    })
  }
}
</script>

