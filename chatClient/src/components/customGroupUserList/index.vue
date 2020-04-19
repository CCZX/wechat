<template>
  <div class="custom-group-user-list-com">
    <header class="header">
      <span class="title">群成员（{{groupOnlineUser.length}}/{{userlist.length}}）</span>
    </header>
    <div class="user-list">
      <div class="user-item" v-for="item in outcomeUserList" :key="item._id">
        <el-avatar
          :class="(onlineUser || []).includes(item.userId._id) ? '' : 'offline'"
          :size="20"
          :src="IMG_URL + item.userId.photo"
          @error="() => true"
        >
          <img
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          >
        </el-avatar>
        <div class="user-detail">
          <span class="normal-font detail-item ellipsis">
            {{item.userId.beizhu ? item.userId.beizhu : item.userId.nickname}}
          </span>
          <span class="is-holder secondary-font" v-if="item.holder">· 群主</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroupUserListComponent",
  props: {
    userlist: Array
  },
  data() {
    return {
      IMG_URL: process.env.IMG_URL
    }
  },
  computed: {
    onlineUser() { // 所有的在线用户
      return this.$store.state.app.onlineUser
    },
    groupOnlineUser() {
      return this.userlist.filter(item => {
        return (this.onlineUser || []).includes(item.userId._id)
      })
    },
    beizhu() { // 备注Map {好友id1: 备注1, 好友id2: 备注2}
      return this.$store.state.user.userInfo.friendBeizhu || {}
    },
    outcomeUserList() {
      const userList = JSON.parse(JSON.stringify(this.userlist))
      return userList.map(item => {
        if (item.userId) {
          item.userId.beizhu = this.beizhu[item.userId._id] ? this.beizhu[item.userId._id] : ''
        }
        return item
      }).sort((a, b) => {
        return b.holder - a.holder
      })
    }
  },
};
</script>

<style lang="scss">
.custom-group-user-list-com {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 5px;
  .header {
    width: 100%;
    padding: 5px 0;
  }
  .user-list {
    flex: 1;
    overflow: scroll;
    .user-item {
      padding: 5px 0;
      display: flex;
      align-items: center;
      .user-detail {
        width: 70%;
        margin-left: 5px;
        .is-holder {
          position: absolute;
          right: 5px;
        }
      }
    }
  }
}
</style>

