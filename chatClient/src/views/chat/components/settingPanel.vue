<template>
  <div class="setting-panel-cmp">
    <div class="operation-list">
      <span
        class="item operation-text"
        @click.stop="showFenzu"
        v-if="currentConversation.conversationType === conversationTypes.friend"
      >切换分组</span>
      
      <el-popover
        placement="top-start"
        width="300"
        trigger="click"
      >
        <el-input placeholder="请输入备注" v-model="newBeizhu" @keydown.enter.native="modifyBeizhu" />
        <span
          class="item operation-text"
          slot="reference"
          @click.stop="()=>{}"
          v-if="currentConversation.conversationType === conversationTypes.friend"
        >修改备注</span>
      </el-popover>
      <span
        class="item operation-text__danger"
        v-if="currentConversation.conversationType === conversationTypes.friend"
      >删除好友</span>
      <span
        class="item operation-text__danger"
        v-if="currentConversation.conversationType === conversationTypes.group"
      >退出群聊</span>
    </div>
    <fenzu-modal
      v-if="isShowFenzu"
      :current-conversation="currentConversation"
      @hidden-fenzu="hiddenFenzu"
    />
  </div>
</template>

<script>
import fenzuModal from '@/components/fenzuModal'
import { conversationTypes } from '@/const'
export default {
  props: ['currentConversation'],
  data() {
    return {
      isShowFenzu: false,
      conversationTypes,
      newBeizhu: ''
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    showFenzu() {
      this.isShowFenzu = true
    },
    hiddenFenzu() {
      this.isShowFenzu = false
    },
    async modifyBeizhu() {
      const params = {
        userId: this.userInfo._id,
        friendId: this.currentConversation._id,
        friendBeizhu: this.newBeizhu
      }
      await this.$http.modifyFriendBeizhu(params)
      const userInfo = await this.$http.getUserInfo(this.userInfo._id)
      this.$store.dispatch('user/LOGIN', userInfo.data.data)
      this.$emit('setCurrentConversation', {...this.currentConversation, beizhu: this.newBeizhu})
      this.newBeizhu = ''
    }
  },
  components: {
    fenzuModal
  }
}
</script>

<style lang="scss">
.setting-panel-cmp {
  padding-left: 20px;
  background-color: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  .operation-list {
    .item {
      line-height: 20px;
    }
  }
}
</style>

