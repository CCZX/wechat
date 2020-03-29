<template>
  <div
    :class="currentConversation._id && currentConversation._id === conversationInfo._id ? 'conversationitem__cmp active' : 'conversationitem__cmp'"
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
            <span class="top-item primary-font detail-item ellipsis space-bw" style="display: flex">
              <span class="ellipsis">{{conversationInfo.groupId.title}}</span>
            </span>
            <span class="bottom-item secondary-font detail-item ellipsis space-bw" style="display: flex">
              <span>{{conversationInfo.groupId.desc}}</span>
            </span>
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
            <el-avatar
              size="large"
              :src="IMG_URL + conversationInfo.photo"
              @error="() => true"
              :class="!onlineUserIds.includes(conversationInfo._id) ? 'offline' : 'online'"
            >
              <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
            </el-avatar>
          </el-badge>
          
          <div class="conversation-detail">
            <span class="top-item primary-font detail-item ellipsis space-bw" style="display: flex">
              <span class="ellipsis">{{conversationInfo.beizhu ? conversationInfo.beizhu : conversationInfo.nickname}}</span>
              <i :class="'level '+ 'lv' + conversationInfo.level"></i>
            </span>
            <span class="bottom-item secondary-font detail-item ellipsis space-bw" style="display: flex">
              <span v-if="type === 'fenzu'">{{conversationInfo.signature}}</span>
              <span v-if="type === 'recent'" style="text-overflow: ellipsis; overflow: hidden;">{{lastNews}}</span>
              <span v-if="type === 'recent' && lastNews" style="margin-left: 5px">{{this.conversationInfo.lastNews.time | formatDateToZH}}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="menu" v-if="isShowMenu" :style="{'left': menuLeft + 'px', 'top': menuTop + 'px'}">
        <conversation-menu
          :conversation="conversationInfo"
          :type="type"
          @remove="remove"
          @hiddenMenu="hiddenMenu"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { formatDateToZH, arrUnique, findParentNode } from '@/utils'
import { MSG_TYPES } from '@/const'
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
    type: { // 定义改组件在哪里被使用，在最近会话中或者分组会话等
      type: String
    },
    recentConversation: {
      type: Array
    }
  },
  data() {
    return {
      unreadnewsNum: 0,
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
      const lastNewsObj = this.conversationInfo.lastNews || {}
      const MSG_TYPE_TEXT = {
        [MSG_TYPES.text]: lastNewsObj.message || '',
        [MSG_TYPES.img]: '[图片]',
        [MSG_TYPES.file]: '[文件]',
        [MSG_TYPES.sys]: '[系统消息]',
        [MSG_TYPES.artBoard]: '[白板协作]',
        [MSG_TYPES.video]: '[视频通话]',
        [MSG_TYPES.audio]: '[语音通话]',
      }
      return MSG_TYPE_TEXT[lastNewsObj.messageType] || ''
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
      const recentFriendIdsStr = window.localStorage.getItem('coMessager-recentConversation-friend') || ''
      const recentFriendIds = arrUnique(recentFriendIdsStr.split(',')).filter(item => item) // 去重
      const index = recentFriendIds.findIndex(item => item === this.conversationInfo._id)
      index !== -1 && recentFriendIds.splice(index, 1)
      window.localStorage.setItem('coMessager-recentConversation-friend', recentFriendIds.join())
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
.conversationitem__cmp {
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
          display: block;
        }
        .top-item {
          height: 18px;
        }
        .bottom-item {
          height: 13px;
          margin-top: 4px;
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
}
</style>
