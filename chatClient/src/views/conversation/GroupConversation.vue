<template>
  <div class="group-conversation-list">
    <el-collapse v-model="activeFenzu">
      <el-collapse-item
        v-for="item in groupCategory"
        :key="item.id"
        :title="`${item.text}（${groupCategoryMap[item.category].length}）`"
        :name="item.category"
      >
        <conversation-item
          v-for="item in groupCategoryMap[item.category]"
          :key="item.id"
          :conversationInfo="item"
          @click.native="changeCurrentConversation(item)"
        />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { conversationTypes } from '@/const'
import { saveMyGroupToLocalStorage } from '@/utils'
import conversationItem from './ConversationItem'
export default {
  props: ['currentConversation', 'setCurrentConversation'],
  data() {
    return {
      conversationList: [],
      activeFenzu: '',
      groupCategory: [
        {id: 0, category: 'myHolderGroup', text: '我创建的群聊'},
        {id: 1, category: 'myManagerGroup', text: '我管理的群聊'},
        {id: 2, category: 'myJoinGroup', text: '我加入的群聊'}
      ]
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    },
    myHolderGroup() {
      return this.conversationList.filter(item => item.holder)
    },
    myManagerGroup() {
      return this.conversationList.filter(item => item.manager)
    },
    myJoinGroup() {
      return this.conversationList.filter(item => !item.holder && !item.manager)
    },
    groupCategoryMap() {
      return {
        myHolderGroup: this.myHolderGroup,
        myManagerGroup: this.myManagerGroup,
        myJoinGroup: this.myJoinGroup
      }
    }
  },
  methods: {
    async getMyGroup() {
      const userName = this.userInfo.name
      const { data, status } = await this.$http.getMyGroup({userName})
      if (data.status === 2000 && (100 <= status <= 400)) {
        const { data: groupList } = data
        groupList.forEach(item => {
          item.conversationType = conversationTypes.group
          item.isGroup = true
          item.roomid = item.groupId._id
        })
        this.conversationList = groupList
        const saveLocalData = groupList.map(item => item.groupId._id)
        saveMyGroupToLocalStorage(saveLocalData)
      }
    },
    changeCurrentConversation(item) {
      this.$emit('setCurrentConversation', item)
    },
    joinChatRoom() {
      this.conversationList.forEach(item => {
        this.$socket.emit("join", item)
      })
    }
  },
  watch: {
    conversationList: {
      handler() {
        this.joinChatRoom()
      }, deep: true, immediate: true
    },
  },
  components: {
    conversationItem
  },
  created() {
    this.getMyGroup()
  },
}
</script>

