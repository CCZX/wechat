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
  </div>
</template>

<script>
import userProfile from '@/components/userProfile'
import fenzuModal from '@/components/fenzuModal'
import beizhuModal from '@/components/beizhuModal'
export default {
  data() {
    return {
      isShowUserProfile: false,
      isShowFenzuModal: false,
      isShowBeizhuModal: false,
      currentConversation: {}
    }
  },
  methods: {
    hiddenFenzuModal() {
      this.isShowFenzuModal = false
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
  },
  components: {
    userProfile,
    fenzuModal,
    beizhuModal
  }
}
</script>
