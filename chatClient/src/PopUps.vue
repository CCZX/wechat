<template>
  <div class="pop-ups">
    <user-profile v-if="isShowUserProfile" />
    <fenzu-modal
      v-if="isShowFenzuModal"
      :current-conversation="currentConversation"
      @hidden-fenzu="hiddenFenzuModal"
    />
  </div>
</template>

<script>
import userProfile from '@/components/userProfile'
import fenzuModal from '@/components/fenzuModal'
export default {
  data() {
    return {
      isShowUserProfile: false,
      isShowFenzuModal: false,
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
      this.currentConversation = data.currentConversation
    })
  },
  components: {
    userProfile,
    fenzuModal
  }
}
</script>
