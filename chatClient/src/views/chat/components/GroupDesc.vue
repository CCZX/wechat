<template>
  <div class="group-desc-com">
    <div class="notice">
      notice
    </div>
    <div class="member">
      <group-user-list :userlist="groupMembers" />
    </div>
  </div>
</template>

<script>
import GroupUserList from '@/components/customGroupUserList'
export default {
  name: "GroupDescComponent",
  props: ["currentConversation"],
  data() {
    return {
      groupMembers: []
    }
  },
  methods: {
    async fetchGroupInfo() {
      if (this.currentConversation.conversationType === 'GROUP') {
        const id = this.currentConversation.groupId._id
        const { data } = await this.$http.getGroupInfo({id})
        const { data: groupInfo, status } = data
        if (status === 2000) {
          this.groupMembers = groupInfo.users
        }
      }
    }
  },
  components: {
    GroupUserList
  },
  created() {
    this.fetchGroupInfo()
  },
}
</script>

<style lang="scss">
.group-desc-com {
  height: 100%;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  .notice {
    height: 50%;
    border-bottom: 1px solid black;
  }
  .member {
    height: 50%;
  }
}
</style>
