<template>
  <div class="chat-user-list__group">
    <group-item v-for="item in groupList" :key="item._id" :groupinfo="item.groupId"></group-item>
  </div>
</template>

<script>
import groupItem from './GroupItem'
export default {
  data() {
    return {
      groupList: []
    }
  },
  components: {
    groupItem
  },
  created() {
    let userName = JSON.parse(this.$store.state.user.userInfo).name
    this.$http.getMyGroup({userName: userName}).then(res => {
      console.log(res)
      let { status, data } = res.data
      this.groupList = data
    })
  },
}
</script>

<style lang="scss">
.chat-user-list__group {
  height: 100%;
}
</style>

