<template>
  <div class="fenzu-conversation-list">
    <el-collapse v-model="activeFenzu">
      <el-collapse-item
        v-for="(item, index) in fenzu"
        :key="index"
        :name="item"
        class="collapse-item"
        :data-title="item"
      >
        <template slot="title">
          <span v-if="currEditFenzu !== item">
            {{outcomeConversation[item] && `${item}（${fenzuOnlineUserNum[item]}/${outcomeConversation[item].length}）`}}
          </span>
          <el-input
            v-else style="margin-right: 20px"
            v-model="currEditFenzuTo" size="mini"
            @keydown.enter.native="confirmEdit"
          />
        </template>
        <conversation-item
          v-for="item in outcomeConversation[item]"
          :key="item.id"
          :conversationInfo="item"
          @click.native="changeCurrentConversation(item)"
          type="fenzu"
        />
      </el-collapse-item>
    </el-collapse>
    <fenzu-menu v-if="showMenu" :top="menuTop" :left="menuLeft"
      @addFenzu="addFenzu" @deleteFenzu="deleteFenzu" @close="closeFenzuMenu"
      @editFenzu="setEditFenzu"
    />
  </div>
</template>

<script>
import { saveMyFriendsToLocalStorage } from '@/utils'
import { conversationTypes } from '@/const'
import conversationItem from './ConversationItem'
import fenzuMenu from './FenzuMenu'
export default {
  props: ['currentConversation', 'setCurrentConversation'],
  data() {
    return {
      conversationList: [],
      activeFenzu: '',
      menuTop: 0,
      menuLeft: 0,
      showMenu: false,
      currClickFenzu: '', // 当前点击的分组
      currEditFenzu: '', // 当前编辑的分组
      currEditFenzuTo: '', // 被编辑分组的新名字
      newFenzu: '' // 新添加分组的名称
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    },
    onlineUserIds() { // 在线用户的id数组
      return this.$store.state.app.onlineUser
    },
    fenzu() { // 用户的分组列表
      return this.newFenzu ? Object.keys(this.userInfo.friendFenzu || {}).concat(this.newFenzu) : Object.keys(this.userInfo.friendFenzu || {})
    },
    beizhu() { // 备注map
      return this.userInfo.friendBeizhu || {}
    },
    firendsList() {
      return this.$store.state.app.allFriends
    },
    hasBeizhuList() { // 给会话列表加上分组
      const conversationList = JSON.parse(JSON.stringify(this.firendsList))
      const offlineUsers = []
      const onlineUsers = []
      conversationList.forEach(item => {
        item.beizhu = this.beizhu[item._id] ? this.beizhu[item._id] : ''
        this.onlineUserIds.includes(item._id) ? onlineUsers.push(item) : offlineUsers.push(item)
      })
      return [...onlineUsers, ...offlineUsers]
    },
    outcomeConversation() { // 根据分组来分类不同的好友
      const conversationList = JSON.parse(JSON.stringify(this.hasBeizhuList))
      const fenzuMap = this.userInfo.friendFenzu // {分组1: [id1, id2, ...], 分组2: [id3, id4, ...]}
      const fenzuKeys = Object.keys(fenzuMap) // [分组1, 分组2, ...]
      const res = {}
      fenzuKeys.forEach(item => {
        res[item] = []
      })
      for (let i = 0; i < conversationList.length; i++) {
        const item = conversationList[i]
        fenzuKeys.forEach(fenzuItem => {
          if (fenzuMap[fenzuItem].includes(item._id)) {
            res[fenzuItem].push(item)
            conversationList.splice(i, 1)
            i--
          }
        })
      }
      if (conversationList.length) {
        res['我的好友'] = [...res['我的好友'], ...conversationList]
      }
      return res
    },
    fenzuOnlineUserNum() { // 计算每个分组的在线用户
      const res = {}
      const obj = this.outcomeConversation
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          let num = 0
          const itemIds = obj[key].map(item => item._id)
          itemIds.forEach(id => {
            this.onlineUserIds.includes(id) && num++
          })
          res[key] = num
        }
      }
      return res
    }
  },
  methods: {
    /** 获取所有的好友 */
    async getMyFriends() {
      const id = this.userInfo._id
      const { data, status } = await this.$http.getMyFriends(id)
      if (data.status === 2000 && (100 <= status <= 400)) {
        const { data: friendList } = data
        friendList.forEach(item => {
          item.conversationType = conversationTypes.friend
          item.myNickname = this.userInfo.nickname
          item.myId = this.userInfo._id
          item.myAvatar = this.userInfo.photo
        })
        this.conversationList = friendList
        this.$store.dispatch('app/SET_ALL_CONVERSATION', friendList)
        this.$store.dispatch('app/SET_ALL_FRIENDS', {
          resource: friendList,
          type: 'init'
        })
        // this.changeCurrentConversation(this.conversationList[0] || {})
        // 把好友的id保存到本地，可能会用到
        const saveLocalData = friendList.map(item => {
          return item._id
        })
        saveMyFriendsToLocalStorage(saveLocalData)
      }
    },
    changeCurrentConversation(item) {
      this.$emit('setCurrentConversation', item)
    },
    joinChatRoom() {
      this.conversationList.forEach(item => {
        this.$socket.emit("join", item)
      })
    },
    handlerCollapseItemClick(e, item) {
      e.preventDefault()
      const { button } = e
      if(button !== 2) return
      this.showMenu = true
      this.menuLeft = e.pageX
      this.menuTop = e.pageY
      this.currClickFenzu = item.dataset.title
    },
    closeFenzuMenu() {
      this.showMenu = false
    },
    addFenzu() {
      this.newFenzu = "分组名"
    },
    async deleteFenzu() {
      if (this.currClickFenzu === '我的好友') {
        return this.$message({
          message: '该分组是默认分组，不能删除',
          type: 'warning'
        })
      }
      const params = {fenzuName: this.currClickFenzu, userId: this.userInfo._id}
      await this.$http.deleteFenzu(params)
      const userInfo = await this.$http.getUserInfo(this.userInfo._id)
      this.$store.dispatch('user/LOGIN', userInfo.data.data)
    },
    setEditFenzu() {
      this.currEditFenzu = this.currEditFenzuTo = this.currClickFenzu
    },
    async confirmEdit() {
      if (this.currEditFenzu === '我的好友') {
        this.currEditFenzu = ''
        return this.$message({type: 'warning', message: '默认分组不能修改！'})
      }
      const { data } = await this.$http.editFeznu({
        oldFenzu: this.currEditFenzu,
        newFenzu: this.currEditFenzuTo,
        userId: this.userInfo._id
      })
      if (data.status === 2000) {
        const userInfo = await this.$http.getUserInfo(this.userInfo._id)
        this.$store.dispatch('user/LOGIN', userInfo.data.data)
        this.$message({type: 'success', message: '修改成功！'})
      } else {
        this.$message({type: 'error', message: '修改失败！'})
      }
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
    conversationItem,
    fenzuMenu
  },
  created() {
    this.getMyFriends()
    this.$nextTick(() =>{
      const collapseItems = [...document.getElementsByClassName('collapse-item')]
      collapseItems.forEach(item => {
        item.addEventListener('contextmenu', (e) => {
          this.handlerCollapseItemClick(e, item)
        })
      })
    })
    document.addEventListener('click', (e) => {
      if (!e.target.classList.contains('el-input__inner')) {
        this.currEditFenzu = ''
      }
      if (!e.target.classList.contains('el-popover__reference')) {
        this.showMenu = false
      }
    })
  },
}
</script>

<style lang="scss">
.fenzu-conversation-list {
  height: 461px;
  overflow-x: hidden;
}
</style>
