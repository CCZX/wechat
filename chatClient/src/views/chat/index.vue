<template>
  <div
    class="chat-view-page"
    v-bgImage="userInfo.wallpaper"
  >
    <div class="chat-view-container">
      <Conversation-list></Conversation-list>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ConversationList from './components/ConversationList'
export default {
  name: 'chatView',
  components: {
    ConversationList
  },
  computed: {
    ...mapState('user', {
      userInfo: 'userInfo'
    })
  }
}
</script>

<style lang="scss">
.chat-view-page {
  height: 100%;
}
</style>


