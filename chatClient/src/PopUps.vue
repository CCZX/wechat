<template>
  <div class="pop-ups">
    <user-profile v-if="isShowUserProfile" />
    <fenzu-modal
      v-if="isShowFenzuModal"
      :current-conversation="currentConversation"
      @hidden-fenzu="hiddenFenzuModal"
    />
    <beizhu-modal
      v-if="isShowBeizhuModal"
      :current-conversation="currentConversation"
    />
    <transition name="fade">
      <bearing-modal
        v-if="showModal && isShowCreateGroup"
        @close="$eventBus.$emit('toggleCreateGroup', { show: false })"
        title="创建群聊"
        :width="400"
      >
        <template slot="body">
          <create-group />
        </template>
      </bearing-modal>
    </transition>
    <message-text-menu
      v-if="isShowMsgTextMenu"
      :message="currentMessage"
      :left="msgTextMenuLeft"
      :top="msgTextMenuTop"
    />
  </div>
</template>

<script>
import './../static/css/animation.scss'
import userProfile from '@/components/userProfile'
import fenzuModal from '@/components/fenzuModal'
import beizhuModal from '@/components/beizhuModal'
import createGroup from '@/components/createGroup'
import bearingModal from '@/components/bearingModal'
import messageTextMenu from '@/components/messageTypes/messageTextMenu'
export default {
  data() {
    return {
      showModal: false,
      isShowUserProfile: false,
      isShowFenzuModal: false,
      isShowBeizhuModal: false,
      isShowCreateGroup: false,
      isShowMsgTextMenu: false,
      currentConversation: {}, // 当前操作的会话

      currentMessage: {}, // 当前操作的消息
      msgTextMenuLeft: 0,
      msgTextMenuTop: 0

    }
  },
  methods: {
    hiddenFenzuModal() {
      this.isShowFenzuModal = false
    },
    close() {
      this.showModal = false
    }
  },
  created() {
    this.$eventBus.$on('showUserProfile', () => {
      this.isShowUserProfile = true
    })
    this.$eventBus.$on('toggleFenzuModal', (e) => {
      const { show, data } = e
      this.isShowFenzuModal = show
      this.currentConversation = data.currentConversation || {}
    })
    this.$eventBus.$on('toggleBeizhuModal', (e) => {
      const { show, data } = e
      this.isShowBeizhuModal = show
      this.currentConversation = data.currentConversation || {}
    })
    this.$eventBus.$on('toggleCreateGroup', (e) => {
      const { show } = e
      this.showModal = show
      this.isShowCreateGroup = show
    })
    this.$eventBus.$on('toggleMsgTextMenu', (e) => {
      const { show, data, left, top } = e
      this.isShowMsgTextMenu = show
      this.currentMessage = data
      this.msgTextMenuLeft = left
      this.msgTextMenuTop = top
    })
  },
  components: {
    userProfile,
    fenzuModal,
    beizhuModal,
    createGroup,
    messageTextMenu,
    bearingModal
  }
}
</script>
