<template>
  <div class="group-desc-com">
    <div class="notice">
      <span>
        富强、民主、文明、和谐、自由、平等、公正、法治，倡导爱国、敬业、诚信、友善
      </span>
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
  border-left: 1px solid #cccccc;
  .notice {
    height: 50%;
    border-bottom: 1px solid #cccccc;
  }
  .member {
    height: 50%;
  }
}
</style>
