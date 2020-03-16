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
    >
      <template slot="body">
        <create-group />
      </template>
    </bearing-modal>
    </transition>
    
  </div>
</template>

<script>
import './../static/css/animation.scss'
import userProfile from '@/components/userProfile'
import fenzuModal from '@/components/fenzuModal'
import beizhuModal from '@/components/beizhuModal'
import createGroup from '@/components/createGroup'
import bearingModal from '@/components/bearingModal'
export default {
  data() {
    return {
      showModal: false,
      isShowUserProfile: false,
      isShowFenzuModal: false,
      isShowBeizhuModal: false,
      isShowCreateGroup: false,
      currentConversation: {}
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
  },
  components: {
    userProfile,
    fenzuModal,
    beizhuModal,
    createGroup,
    bearingModal
  }
}
</script>
