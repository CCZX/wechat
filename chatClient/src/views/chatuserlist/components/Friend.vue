<template>
  <div class="chat-user-list__friend">
    <chat-item v-for="item in userList" :key="item.id" :userinfo="item"></chat-item>
  </div>
</template>

<script>
import ChatItem from './ChatItem'
export default {
  data() {
    return {
      userList: []
    }
  },
  // computed: {
  //   userList() {

  //   }
  // },
  components: {
    ChatItem
  },
  created() {
    let id = this.$store.state.user.userInfo._id
    this.$http.getMyFriends(id).then(res => {
      let { data, status } = res.data
      if (res.status === 200 && status === 2000) {
        this.userList = data
      }
    })
  },
}
</script>

<style lang="scss">
.chat-user-list__friend {
  height: 100%;
  width: 100%;
}
</style>
