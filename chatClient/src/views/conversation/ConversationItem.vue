<template>
  <div
    :class="currentConversation._id && currentConversation._id === conversationInfo._id ? 'conversationitem__com active' : 'conversationitem__com'"
    v-if="conversationInfo._id"
  >
    <template v-if="conversationInfo.isGroup">
      <div class="conversation-info">
        <div class="wrapper">
          <el-badge
            :value="unreadNews[conversationInfo.roomid]"
            :hidden="unreadNews[conversationInfo.roomid] === 0"
            class="item el-badge"
          >
            <el-avatar
              size="large"
              :src="IMG_URL + conversationInfo.groupId.img"
              @error="() => true"
            >
              <img
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              >
            </el-avatar>
          </el-badge>
          
          <div class="conversation-detail">
            <!-- <i class="icon-qun iconfont"></i> -->
            <span class="primary-font detail-item">{{conversationInfo.groupId.title}}</span>
            <span class="ellipsis secondary-font detail-item">{{conversationInfo.groupId.desc}}</span>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="conversation-info" @contextmenu.prevent.stop="showMenu">
        <div class="wrapper">
          <el-badge
            :value="unreadNews[conversationInfo.roomid]"
            :hidden="unreadNews[conversationInfo.roomid] === 0"
            class="item el-badge"
          >
            <router-link :to="`/user/${conversationInfo._id}`">
              <el-avatar
                size="large"
                :src="IMG_URL + conversationInfo.photo"
                @error="() => true"
                :class="!onlineUserIds.includes(conversationInfo._id) ? 'offline' : 'online'"
              >
                <img
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                >
              </el-avatar>
            </router-link>
          </el-badge>
          
          <div class="conversation-detail">
            <span class="primary-font detail-item ellipsis space-bw" style="display: flex">
              <span class="ellipsis">{{conversationInfo.beizhu ? conversationInfo.beizhu : conversationInfo.nickname}}</span>
              <i :class="'level '+ 'lv' + conversationInfo.level"></i>
            </span>
            <span class="ellipsis secondary-font detail-item space-bw" style="display: flex">
              <span v-if="type === 'fenzu'">{{conversationInfo.signature}}</span>
              <span v-if="type === 'recent'" style="text-overflow: ellipsis; overflow: hidden;">{{lastNews}}</span>
              <span v-if="type === 'recent' && lastNews" style="margin-left: 5px">{{this.conversationInfo.lastNews.time | formatDateToZH}}</span>
            </span>
          </div>
        </div>
      </div>
      <!-- <i class="el-icon-more"></i> -->
      <!-- <el-tooltip effect="dark" content="从最近会话中删除" placement="top">
        <i v-if="type === 'recent'" class="el-icon-circle-close" @click.stop="remove"></i>
      </el-tooltip> -->
      <div class="menu" v-if="isShowMenu" :style="{'left': menuLeft + 'px', 'top': menuTop + 'px'}">
        <conversation-menu
          :conversation="conversationInfo"
          @remove="remove"
          @hiddenMenu="hiddenMenu"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { formatDateToZH, arrUnique, findParentNode } from '@/utils'
import conversationMenu from './Menu'
const conversationObj = {
  createDate: "",
  nickname: "",
  photo: "",
  signature: "",
  id: "",
  roomid: ""
};
import './../../../static/iconfont/iconfont.css'
export default {
  name: "ConversationItemComponent",
  props: {
    conversationInfo: {
      type: Object,
      default() {
        return conversationObj
      }
    },
    currentConversation: {
      type: Object,
      default() {
        return conversationObj
      }
    },
    type: {
      type: String
    },
    recentConversation: {
      type: Array
    }
  },
  data() {
    return {
      unreadnewsNum: 0,
      levelIcons: require('./../../../static/image/icons.png'),
      isShowMenu: false,
      IMG_URL: process.env.IMG_URL,
      menuTop: 0,
      menuLeft: 0
    }
  },
  computed: {
    unreadNews() {
      return this.$store.state.news.unreadNews
    },
    lastNews() {
      const lastNewsObj = this.conversationInfo.lastNews
      let res = ''
      if (lastNewsObj && lastNewsObj.messageType === "img") {
        res = '[图片]'
      }
      if (lastNewsObj && lastNewsObj.messageType === "text") {
        res = lastNewsObj.message
      }
      return res
    },
    recentConversationList() {
      return this.$store.state.app.recentConversation
    },
    onlineUserIds() { // 在线用户的id数组
      return this.$store.state.app.onlineUser
    }
  },
  methods: {
    remove() {
      this.isShowMenu = false
      const recentFriendIdsStr = window.localStorage.getItem('coMessager-recentConversation') || ''
      const recentFriendIds = arrUnique(recentFriendIdsStr.split(',')).filter(item => item) // 去重
      const index = recentFriendIds.findIndex(item => item === this.conversationInfo._id)
      index !== -1 && recentFriendIds.splice(index, 1)
      window.localStorage.setItem('coMessager-recentConversation', recentFriendIds.join())
      this.$store.dispatch('app/SET_RECENT_CONVERSATION', {type: 'delete', data: this.conversationInfo})
      if (this.conversationInfo._id === this.currentConversation._id) {
        const conversationList = this.recentConversationList.filter(item => Object.keys(item).length > 0)
        const index = conversationList.findIndex(item => item._id === this.conversationInfo._id)
        this.$emit('setCurrentConversation', conversationList[0] || {})
        console.log(index, this.recentConversationList.filter(item => Object.keys(item).length > 0))
      }
    },
    showMenu(e) {
      this.isShowMenu = true
      this.menuLeft = e.pageX
      this.menuTop = e.pageY
    },
    hiddenMenu() {
      this.isShowMenu = false
    }
  },
  filters: {
    formatDateToZH(val) {
      return formatDateToZH(val)
    }
  },
  components: {
    conversationMenu
  },
  created() {
    document.addEventListener('click', () => {
      this.isShowMenu = false
    })
    document.addEventListener('mousedown', (e) => {
      const { button } = e
      if (button === 2) {
        this.isShowMenu = false        
      }
    })
  },
};
</script>

<style lang="scss">
.conversationitem__com {
  @import "./../../../static/css/var.scss";
  position: relative;
  height: 60px;
  display: flex;
  margin: 5px 0;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    .wrapper {
      background-color: rgba(0, 0, 0, 0.1);
      transition: all 0.5s ease-in;
    }
    .el-icon-more {
      display: block;
    }
    .el-icon-circle-close {
      opacity: 1;
    }
  }
  &.active {
    .wrapper {
      background-color: rgba(0, 0, 0, 0.1);
      transition: all 0.5s ease-in;
    }
  }
  .conversation-info {
    width: 100%;
    height: 60px;
    padding: 0 10px;
    .wrapper {
      display: flex;
      height: 60px;
      padding: 0 5px;
      align-items: center;
      border-radius: 10px;
      overflow: hidden;
      .el-badge {
        top: 4px;
        overflow: visible;
      }
      .conversation-detail {
        width: calc(100% - 50px);
        margin-left: 10px;
        .detail-item {
          margin-top: 2px;
          display: block;
        }
      }
    }
  }
  .menu {
    position: fixed;
    z-index: 1004;
    background-color: #fff;
    border-radius: 5px;
    // width: 100px;
  }
  .el-icon-more {
    display: none;
    position: absolute;
    right: 15px;
    padding: 2px 3px 2px 2px;
    font-size: 10px;
    border: 1px solid hsla(230, 10%, 30%, 1);
    border-radius: 50%;
    transition: all 0.5s ease-in;
  }
  .el-icon-circle-close {
    opacity: 0;
    position: absolute;
    right: 15px;
    top: 5px;
    font-size: 18px;
    transition: all 0.5s ease-in;
  }
}
</style>

